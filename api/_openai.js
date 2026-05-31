const OPENAI_BASE_URL = "https://api.openai.com/v1";

export function requirePost(request, response) {
  if (request.method === "POST") {
    return true;
  }

  response.setHeader("Allow", "POST");
  response.status(405).json({ message: "POST 요청만 사용할 수 있습니다." });
  return false;
}

export function requireOpenAIKey(response) {
  const apiKey = process.env.OPENAI_API_KEY?.trim() || process.env.GPT_PLUS?.trim();

  if (!apiKey) {
    response.status(500).json({
      message: "서버에 OpenAI API Key가 설정되지 않았습니다."
    });
    return null;
  }

  return apiKey;
}

export function getJsonBody(request) {
  if (!request.body) {
    return {};
  }

  if (typeof request.body === "string") {
    return JSON.parse(request.body);
  }

  return request.body;
}

export async function createResponse(apiKey, payload) {
  const upstream = await fetch(`${OPENAI_BASE_URL}/responses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  });

  const data = await upstream.json();
  if (!upstream.ok) {
    const message = data?.error?.message || "OpenAI 요청 실패";
    const error = new Error(message);
    error.status = upstream.status;
    throw error;
  }

  return data;
}

export function extractTextFromResponse(payload) {
  if (typeof payload?.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  if (!Array.isArray(payload?.output)) {
    return "";
  }

  const chunks = [];
  payload.output.forEach((item) => {
    if (typeof item?.content === "string") {
      chunks.push(item.content);
    }
    if (Array.isArray(item.content)) {
      item.content.forEach((contentItem) => {
        if (typeof contentItem?.text === "string") {
          chunks.push(contentItem.text);
        }
        if (typeof contentItem?.output_text === "string") {
          chunks.push(contentItem.output_text);
        }
        if (typeof contentItem?.text?.value === "string") {
          chunks.push(contentItem.text.value);
        }
      });
    }
    if (typeof item?.text === "string") {
      chunks.push(item.text);
    }
    if (typeof item?.output_text === "string") {
      chunks.push(item.output_text);
    }
  });

  return chunks.join("\n").trim();
}
