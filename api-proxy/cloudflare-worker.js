export default {
  async fetch(request, env) {
    const allowedOrigin = env.ALLOWED_ORIGIN || "*";
    const cors = buildCorsHeaders(allowedOrigin, request.headers.get("Origin"));

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405, cors);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ error: "JSON 본문 파싱 실패" }, 400, cors);
    }

    const question = typeof payload?.question === "string" ? payload.question.trim() : "";
    const instructions = typeof payload?.instructions === "string" ? payload.instructions.trim() : "";
    const model =
      typeof payload?.model === "string" && payload.model.trim()
        ? payload.model.trim()
        : "gpt-5-mini";

    if (!question) {
      return jsonResponse({ error: "question 필드가 필요합니다." }, 400, cors);
    }

    if (!env.OPENAI_API_KEY) {
      return jsonResponse({ error: "서버에 OPENAI_API_KEY가 설정되지 않았습니다." }, 500, cors);
    }

    const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model,
        instructions,
        input: question,
        max_output_tokens: 420
      })
    });

    const openaiJson = await openaiResponse.json();
    if (!openaiResponse.ok) {
      const message = openaiJson?.error?.message || "OpenAI 요청 실패";
      return jsonResponse({ error: message }, openaiResponse.status, cors);
    }

    const output = extractTextFromResponse(openaiJson);
    if (!output) {
      return jsonResponse({ error: "모델 응답 텍스트를 찾지 못했습니다." }, 502, cors);
    }

    return jsonResponse({ output }, 200, cors);
  }
};

function buildCorsHeaders(allowedOrigin, requestOrigin) {
  let origin = "*";
  if (allowedOrigin !== "*") {
    origin = allowedOrigin;
  } else if (requestOrigin) {
    origin = requestOrigin;
  }

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json; charset=utf-8",
    Vary: "Origin"
  };
}

function jsonResponse(body, status, corsHeaders) {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders
  });
}

function extractTextFromResponse(payload) {
  if (typeof payload?.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  if (!Array.isArray(payload?.output)) {
    return "";
  }

  const chunks = [];
  payload.output.forEach((item) => {
    if (Array.isArray(item.content)) {
      item.content.forEach((contentItem) => {
        if (typeof contentItem?.text === "string") {
          chunks.push(contentItem.text);
        }
      });
    }
    if (typeof item?.text === "string") {
      chunks.push(item.text);
    }
  });

  return chunks.join("\n").trim();
}
