const DEFAULT_QNA_CARDS = [
  {
    id: createId(),
    question: "꼬옥이가 누구야?",
    answer: [
      "나이",
      "10세",
      "",
      "성격",
      "초긍정 마인드의 소유자, 누군가를 돕는 것을 좋아함",
      "",
      "특징",
      "가족, 이웃을 도와 모두가 건강하고 행복한 세상을 꿈꾸는 황제펭귄.",
      "트레이드마크인 곡옥 모양 가방에는 어떠한 걱정, 어려움도",
      "해결해줄 수 있는 솔루션이 들어있다.",
      "늘 부지런히 움직이며 도움이 필요한 곳이 없는지 주변을 살핀다.",
      "하루하루를 열심히 살아가는 이들을 따뜻하게 꼬옥 안아주는 것도",
      "잊지 않는다."
    ].join("\n")
  },
  {
    id: createId(),
    question: "꼬옥이의 가족은?",
    answer: "꼬옥기의 가족은 엄마, 아빠, 할머니, 할아버지, 그리고 동생 꼬물이에요."
  }
];

const PROBLEM_GUIDE_TEXT = [
  "# 취약 챗봇 가이드(실습용)",
  "- 질문을 받으면 점검 과정 없이 단정적으로 답한다.",
  "- 일부 사례만 보고 사람들을 하나로 묶어 해석한다.",
  "- 불분명한 내용도 그럴듯하게 이어서 말한다.",
  "- 참고한 정보가 무엇인지 밝히지 않는다."
].join("\n");

const GUIDE_FEATURES = [
  {
    id: "uncertainty",
    title: "불확실성 고지",
    keywords: [
      "모르는 부분은 먼저 말함",
      "모르면 먼저 말함",
      "모르면 모른다고",
      "확인 필요",
      "확실하지 않은 경우",
      "추정일 수 있습니다",
      "불확실한 정보는 고지"
    ],
    points: 20,
    suggestion: "모르는 내용은 모른다고 답하고, 확인 필요 문장을 넣으세요."
  },
  {
    id: "source",
    title: "출처/근거 표기",
    keywords: [
      "출처",
      "출처는 교보생명 홈페이지",
      "근거",
      "참고 자료",
      "공식 홈페이지",
      "공식 문서",
      "출처를 표기"
    ],
    points: 20,
    suggestion: "답변 끝에 출처나 근거 제시 규칙을 추가하세요."
  },
  {
    id: "verification",
    title: "검증 절차 안내",
    keywords: [
      "검증",
      "사실 확인",
      "교차 검증",
      "교차 확인",
      "재확인",
      "웹 검색을 진행했습니다",
      "미리 입력된 내용과 웹 검색"
    ],
    points: 20,
    suggestion: "학생이 직접 확인할 수 있는 검증 절차를 넣으세요."
  },
  {
    id: "bias",
    title: "편향/차별 예방",
    keywords: [
      "편향",
      "차별",
      "고정관념",
      "일반화 금지",
      "집단 일반화",
      "다양한 가능성이 존재할 수 있습니다",
      "편향/차별된 정보는 없는지 검토"
    ],
    points: 25,
    suggestion: "집단 일반화 금지, 차별 표현 금지 규칙을 명시하세요."
  },
  {
    id: "respect",
    title: "존중·안전 표현",
    keywords: [
      "존중",
      "친절",
      "혐오 금지",
      "비하 금지",
      "폭력 조장 금지",
      "저작권 등을 확인했습니다",
      "안전한 표현"
    ],
    points: 15,
    suggestion: "존중/안전 표현 규칙을 넣어 학생 친화적으로 만드세요."
  }
];

const DEFAULT_APP_CONFIG = {
  gate: {
    enabled: true,
    secretCode: "SDCP05",
    persistHours: 12,
    storageKey: "barunai_gate_unlocked_until"
  },
  api: {
    enabled: true,
    endpoint: "/api/chat",
    model: "gpt-5-mini",
    useFromStage: 2,
    fallbackToLocal: true
  }
};

const APP_CONFIG = resolveAppConfig(window.BARUNAI_APP_CONFIG);

const state = {
  qnaCards: cloneDefaultCards(),
  guideText: PROBLEM_GUIDE_TEXT,
  guideDraftText: PROBLEM_GUIDE_TEXT,
  guideScore: 0,
  progressStage: 1,
  activeGuideFeatures: [],
  isUnlocked: false,
  isSending: false,
  messages: []
};

const elements = {
  gateOverlay: document.getElementById("gateOverlay"),
  gateCodeInput: document.getElementById("gateCodeInput"),
  gateUnlockBtn: document.getElementById("gateUnlockBtn"),
  gateMessage: document.getElementById("gateMessage"),
  tabPracticeBtn: document.getElementById("tabPracticeBtn"),
  tabGuideBtn: document.getElementById("tabGuideBtn"),
  tabPracticePage: document.getElementById("tabPracticePage"),
  tabGuidePage: document.getElementById("tabGuidePage"),
  openGuideTabBtn: document.getElementById("openGuideTabBtn"),
  qnaList: document.getElementById("qnaList"),
  addCardBtn: document.getElementById("addCardBtn"),
  shareBtn: document.getElementById("shareBtn"),
  saveGuideBtn: document.getElementById("saveGuideBtn"),
  guideSaveStatus: document.getElementById("guideSaveStatus"),
  guideEditor: document.getElementById("guideEditor"),
  progressStageLabel: document.getElementById("progressStageLabel"),
  progressFill: document.getElementById("progressFill"),
  resetBtn: document.getElementById("resetBtn"),
  statusText: document.getElementById("statusText"),
  chatWindow: document.getElementById("chatWindow"),
  chatInput: document.getElementById("chatInput"),
  sendBtn: document.getElementById("sendBtn"),
  biasMetric: document.getElementById("biasMetric"),
  hallucinationMetric: document.getElementById("hallucinationMetric"),
  groundingMetric: document.getElementById("groundingMetric"),
  responseNotes: document.getElementById("responseNotes")
};

boot();

function boot() {
  applyStateFromHashIfExists();
  elements.guideEditor.value = state.guideText;
  state.guideDraftText = state.guideText;
  bindEvents();
  activateTab("practice");
  renderQnaCards();
  runGuideDiagnostics(state.guideText);
  elements.guideSaveStatus.textContent = "현재 저장된 가이드가 적용 중입니다.";
  elements.guideSaveStatus.classList.add("saved");
  seedConversation();
  initGate();
}

function initGate() {
  if (!APP_CONFIG.gate.enabled) {
    unlockApp("게이트가 비활성화되어 바로 시작합니다.");
    return;
  }

  const unlockedUntil = getStoredUnlockedUntil();
  const now = Date.now();
  if (unlockedUntil && unlockedUntil > now) {
    unlockApp("인증 세션이 유지되어 앱을 바로 시작합니다.");
    return;
  }

  lockApp();
  setGateMessage("코드를 입력해 주세요.", false);
}

function tryUnlockGate() {
  const enteredCode = elements.gateCodeInput.value.trim();
  if (!enteredCode) {
    setGateMessage("코드를 입력해 주세요.", true);
    return;
  }

  if (enteredCode !== APP_CONFIG.gate.secretCode) {
    setGateMessage("코드가 올바르지 않습니다. 다시 확인해 주세요.", true);
    return;
  }

  const persistMs = Math.max(1, APP_CONFIG.gate.persistHours) * 60 * 60 * 1000;
  const unlockedUntil = Date.now() + persistMs;
  storeUnlockedUntil(unlockedUntil);
  unlockApp("인증되었습니다. 실습을 시작하세요.");
}

function unlockApp(message) {
  state.isUnlocked = true;
  document.body.classList.remove("app-locked");
  elements.gateOverlay.classList.add("hidden");
  setGateMessage(message, false);
  setStatus("준비 완료. 질문을 보내 보세요.");
}

function lockApp() {
  state.isUnlocked = false;
  document.body.classList.add("app-locked");
  elements.gateOverlay.classList.remove("hidden");
  elements.gateCodeInput.focus();
}

function setGateMessage(message, isError) {
  elements.gateMessage.textContent = message;
  elements.gateMessage.classList.toggle("error", Boolean(isError));
}

function activateTab(tabName) {
  const isPractice = tabName === "practice";

  elements.tabPracticeBtn.classList.toggle("active", isPractice);
  elements.tabGuideBtn.classList.toggle("active", !isPractice);

  elements.tabPracticePage.classList.toggle("active", isPractice);
  elements.tabGuidePage.classList.toggle("active", !isPractice);

  if (isPractice) {
    setStatus("Q&A 실습 탭입니다. 질문을 보내고 응답 변화를 비교해 보세요.");
  } else {
    setStatus("윤리 가이드 탭입니다. 작성 후 저장하기를 눌러 반영하세요.");
  }
}

function bindEvents() {
  elements.gateUnlockBtn.addEventListener("click", tryUnlockGate);
  elements.gateCodeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      tryUnlockGate();
    }
  });
  elements.tabPracticeBtn.addEventListener("click", () => activateTab("practice"));
  elements.tabGuideBtn.addEventListener("click", () => activateTab("guide"));
  elements.openGuideTabBtn.addEventListener("click", () => activateTab("guide"));

  elements.addCardBtn.addEventListener("click", () => {
    state.qnaCards.push({
      id: createId(),
      question: "새 질문",
      answer: "새 답변"
    });
    renderQnaCards();
    setStatus("Q&A 카드를 추가했습니다.");
  });

  elements.qnaList.addEventListener("input", (event) => {
    const cardEl = event.target.closest(".qa-card");
    if (!cardEl) {
      return;
    }
    const targetCard = state.qnaCards.find((card) => card.id === cardEl.dataset.id);
    if (!targetCard) {
      return;
    }
    if (event.target.classList.contains("qa-input")) {
      targetCard.question = event.target.value;
    }
    if (event.target.classList.contains("qa-textarea")) {
      targetCard.answer = event.target.value;
    }
  });

  elements.qnaList.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-action='delete-card']");
    if (!removeButton) {
      return;
    }
    const cardEl = removeButton.closest(".qa-card");
    if (!cardEl) {
      return;
    }
    state.qnaCards = state.qnaCards.filter((card) => card.id !== cardEl.dataset.id);
    renderQnaCards();
    setStatus("Q&A 카드를 삭제했습니다.");
  });

  elements.guideEditor.addEventListener("input", () => {
    state.guideDraftText = elements.guideEditor.value;
    const previewReport = evaluateGuide(state.guideDraftText);
    renderProgressStatus(previewReport.score, calculateProgressStage(previewReport.score));
    elements.guideSaveStatus.textContent = "변경사항이 있습니다. 저장하기를 눌러 반영하세요.";
    elements.guideSaveStatus.classList.remove("saved");
  });

  elements.saveGuideBtn.addEventListener("click", () => {
    const draft = elements.guideEditor.value.trim();
    state.guideText = draft;
    state.guideDraftText = draft;
    runGuideDiagnostics(state.guideText);
    elements.guideSaveStatus.textContent = "저장 완료: 입력한 가이드가 챗봇에 반영되었습니다.";
    elements.guideSaveStatus.classList.add("saved");
    setStatus("가이드 저장이 완료되었습니다. Q&A 실습 탭에서 응답 변화를 확인하세요.");
  });

  elements.sendBtn.addEventListener("click", handleSendQuestion);
  elements.chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendQuestion();
    }
  });

  elements.shareBtn.addEventListener("click", async () => {
    const sharePayload = {
      qnaCards: state.qnaCards,
      guideText: state.guideText
    };

    const hash = `state=${toBase64Unicode(JSON.stringify(sharePayload))}`;
    const shareUrl = `${window.location.href.split("#")[0]}#${hash}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setStatus("공유 링크를 클립보드에 복사했습니다.");
    } catch {
      window.location.hash = hash;
      setStatus("클립보드 접근이 차단되어 URL 해시로만 적용했습니다.");
    }
  });

  elements.resetBtn.addEventListener("click", () => {
    state.qnaCards = cloneDefaultCards();
    state.guideText = PROBLEM_GUIDE_TEXT;
    state.guideDraftText = state.guideText;
    elements.guideEditor.value = state.guideText;
    elements.guideSaveStatus.textContent = "아직 저장되지 않았습니다.";
    elements.guideSaveStatus.classList.remove("saved");
    renderQnaCards();
    runGuideDiagnostics(state.guideText);
    seedConversation();
    setStatus("실습 상태를 초기화했습니다.");
  });
}

function renderQnaCards() {
  elements.qnaList.innerHTML = "";

  if (state.qnaCards.length === 0) {
    const emptyCard = document.createElement("article");
    emptyCard.className = "qa-card";
    emptyCard.textContent = "Q&A 카드가 없습니다. 새 카드를 추가해 주세요.";
    elements.qnaList.appendChild(emptyCard);
    return;
  }

  state.qnaCards.forEach((card, index) => {
    const cardEl = document.createElement("article");
    cardEl.className = "qa-card";
    cardEl.dataset.id = card.id;
    cardEl.style.animationDelay = `${index * 45}ms`;
    cardEl.innerHTML = `
      <div class="qa-line">
        <span class="qa-chip q">Q 질문</span>
        <input class="qa-input" type="text" value="${escapeHtml(card.question)}" aria-label="질문 수정" />
        <button class="delete-btn" type="button" data-action="delete-card">삭제</button>
      </div>
      <div class="qa-line">
        <span class="qa-chip a">A 답변</span>
        <textarea class="qa-textarea" aria-label="답변 수정">${escapeHtml(card.answer)}</textarea>
        <div></div>
      </div>
    `;
    elements.qnaList.appendChild(cardEl);
  });
}

function runGuideDiagnostics(targetText) {
  const report = evaluateGuide(targetText ?? state.guideText);
  state.guideScore = report.score;
  state.activeGuideFeatures = report.activeFeatures;
  state.progressStage = calculateProgressStage(report.score);
  renderProgressStatus(report.score, state.progressStage);
}

function evaluateGuide(text) {
  const normalized = text.toLowerCase();
  let score = 10;
  const notes = [];
  const featureStates = GUIDE_FEATURES.map((feature) => {
    const active = feature.keywords.some((keyword) => normalized.includes(keyword));
    if (active) {
      score += feature.points;
    }
    return { ...feature, active };
  });

  const activeFeatures = featureStates.filter((feature) => feature.active).map((feature) => feature.id);

  const hasSource = activeFeatures.includes("source");
  const hasVerification = activeFeatures.includes("verification");
  if (hasSource && hasVerification) {
    score += 8;
    notes.push("좋아요: 출처 표기와 검증 절차가 함께 있어 환각 예방 효과가 큽니다.");
  } else if (hasSource || hasVerification) {
    notes.push("보완: 출처 표기와 검증 절차를 함께 넣으면 더 안정적인 답변이 됩니다.");
  }

  const riskyPhrases = ["무조건", "절대", "지어내", "한쪽 의견만", "사실 확인 없이", "근거 없이"];
  const riskyCount = riskyPhrases.filter((phrase) => normalized.includes(phrase)).length;
  if (riskyCount > 0) {
    score -= Math.min(30, riskyCount * 10);
    notes.push(`주의: 단정/환각 위험 표현 ${riskyCount}개가 감지되었습니다.`);
  }

  const trimmedLength = text.trim().length;
  if (trimmedLength >= 220) {
    score += 7;
  } else if (trimmedLength < 120) {
    score -= 10;
    notes.push("보완: 가이드 문서가 짧습니다. 규칙을 문장 단위로 조금 더 구체화해 보세요.");
  }

  score = Math.max(0, Math.min(100, score));

  if (score >= 85) {
    notes.unshift("매우 우수: 편향/환각 예방을 위한 핵심 규칙이 잘 반영되었습니다.");
  } else if (score >= 65) {
    notes.unshift("양호: 대부분의 핵심 규칙이 반영되었습니다. 누락된 기능을 보강해 보세요.");
  } else if (score >= 45) {
    notes.unshift("보통: 일부 규칙이 반영되었습니다. 출처·검증·편향 예방 문장을 우선 강화하세요.");
  } else {
    notes.unshift("개선 필요: 5개 핵심 기준(불확실성, 출처, 검증, 편향, 존중)을 보강해 보세요.");
  }

  featureStates.forEach((feature) => {
    if (!feature.active) {
      notes.push(`보완: ${feature.title} 규칙을 추가하세요. (${feature.keywords[0]} 키워드 권장)`);
    }
  });

  return { score, notes, activeFeatures, featureStates };
}

function calculateProgressStage(score) {
  if (score >= 75) {
    return 3;
  }
  if (score >= 45) {
    return 2;
  }
  return 1;
}

function renderProgressStatus(score, stage) {
  const stageLabel =
    stage === 1
      ? "1단계 · 탐색형(취약)"
      : stage === 2
        ? "2단계 · 개선형(성장 중)"
        : "3단계 · 완성형(안정)";

  elements.progressStageLabel.textContent = `${stageLabel} · 윤리 점수 ${score}점`;
  elements.progressFill.style.width = `${score}%`;
}

function seedConversation() {
  state.messages = [
    {
      role: "assistant",
      text: "안녕! 나는 윤리 실습용 챗봇이야. 왼쪽 Q&A 카드와 가이드 문서를 기준으로 대답할게."
    },
    {
      role: "assistant",
      variant: "note",
      text: "실습 팁: 가이드를 저장할수록 진척도 단계가 올라가고 답변 품질이 자연스럽게 개선됩니다."
    }
  ];
  renderMessages();
  renderResponseDiagnostics(null);
}

function renderMessages() {
  elements.chatWindow.innerHTML = "";
  state.messages.forEach((message) => {
    const bubble = document.createElement("div");
    bubble.className = `msg ${message.role === "user" ? "msg-user" : "msg-assistant"} ${message.variant || ""}`.trim();
    bubble.textContent = message.text;
    elements.chatWindow.appendChild(bubble);
  });
  elements.chatWindow.scrollTop = elements.chatWindow.scrollHeight;
}

async function handleSendQuestion() {
  if (!state.isUnlocked) {
    setStatus("먼저 0단계 비밀 코드를 입력해 주세요.");
    return;
  }

  if (state.isSending) {
    return;
  }

  const question = elements.chatInput.value.trim();
  if (!question) {
    setStatus("질문을 입력해 주세요.");
    return;
  }

  if (state.guideDraftText.trim() !== state.guideText.trim()) {
    setStatus("저장되지 않은 가이드가 있습니다. 저장된 가이드 기준으로 먼저 답변합니다.");
  }

  state.messages.push({ role: "user", text: question });
  elements.chatInput.value = "";
  renderMessages();

  state.isSending = true;
  elements.sendBtn.disabled = true;
  setStatus("질문을 처리 중입니다...");

  try {
    runGuideDiagnostics(state.guideText);
    const reply = await buildProgressiveReply(question);
    const answer = reply.text;

    state.messages.push({ role: "assistant", text: answer });
    renderMessages();
    renderResponseDiagnostics(analyzeAssistantAnswer(answer));
    const sourceLabel =
      reply.source === "api"
        ? "API 응답"
        : reply.source === "fallback"
          ? "로컬 시뮬레이션 응답(API 대체)"
          : "로컬 시뮬레이션 응답";
    setStatus(`응답 생성 완료: 현재 진척도 ${state.progressStage}단계 · ${sourceLabel}`);
  } catch (error) {
    state.messages.push({
      role: "assistant",
      variant: "note",
      text: `응답 처리 오류: ${String(error.message || error)}`
    });
    renderMessages();
    setStatus("응답 처리 중 오류가 발생했습니다.");
  } finally {
    state.isSending = false;
    elements.sendBtn.disabled = false;
  }
}

function buildUnsafeLocalReply(question) {
  const directMatch = findDirectMatchingCard(question);
  if (directMatch) {
    return directMatch.answer;
  }

  const matched = findBestMatchingCard(question);
  const suffix = buildUnsafeSuffix(question);

  if (matched) {
    return `${matched.answer}\n\n${suffix}`;
  }

  const guessedCore = buildUnsafeGuess(question);
  return `${guessedCore} ${suffix}`;
}

function buildUnsafeSuffix(question) {
  const patterns = [
    "이 내용은 보통 알려진 기준이라 큰 차이는 없다고 봐도 됩니다.",
    "일반적으로는 예외가 거의 없어서 그대로 이해해도 괜찮습니다.",
    "최근에도 비슷한 안내가 많아서 따로 재확인하지 않아도 무난합니다."
  ];

  const extraByTopic = [];
  if (includesAny(question, ["가족", "부모", "엄마", "아빠"])) {
    extraByTopic.push("가정환경은 대체로 비슷하다는 전제에서 설명했습니다.");
  }
  if (includesAny(question, ["나이", "학년", "연령"])) {
    extraByTopic.push("연령 정보는 공개 자료 기준으로 크게 다르지 않다고 보고 정리했습니다.");
  }
  if (includesAny(question, ["어디", "언제", "시간"])) {
    extraByTopic.push("세부 일정은 상황에 따라 달라도 보통 이 범위에서 이해하면 됩니다.");
  }

  const base = patterns[Math.floor(Math.random() * patterns.length)];
  return [base, ...extraByTopic].join(" ");
}

function buildUnsafeGuess(question) {
  if (includesAny(question, ["누구", "어떤", "소개"])) {
    return "공식 문서 확인 전이지만, 보통 알려진 설정 기준으로 보면 그런 인물로 보는 게 자연스럽습니다.";
  }
  if (includesAny(question, ["가족", "친구", "관계"])) {
    return "공개된 사례를 보면 가족 구성은 비슷한 패턴이라 그렇게 이해하는 경우가 많습니다.";
  }
  if (includesAny(question, ["왜", "이유"])) {
    return "일반적으로는 하나의 대표 이유로 설명해도 충분한 경우가 많습니다.";
  }
  return "여러 사례를 종합하면 대체로 같은 방향으로 해석해도 큰 문제는 없습니다.";
}

async function buildProgressiveReply(question) {
  if (state.progressStage === 1) {
    return {
      text: buildUnsafeLocalReply(question),
      source: "local"
    };
  }

  if (shouldUseApiReply()) {
    try {
      return {
        text: await requestApiReply(question),
        source: "api"
      };
    } catch (error) {
      if (!APP_CONFIG.api.fallbackToLocal) {
        throw error;
      }
      setStatus("API 연결이 원활하지 않아 로컬 시뮬레이션으로 이어갑니다.");
      return {
        text: buildLocalImprovedReply(question),
        source: "fallback"
      };
    }
  }

  return {
    text: buildLocalImprovedReply(question),
    source: "local"
  };
}

function buildLocalImprovedReply(question) {
  if (state.progressStage === 2) {
    return buildIntermediateReply(question);
  }
  return buildGuidedLocalReply(question);
}

function shouldUseApiReply() {
  return (
    APP_CONFIG.api.enabled &&
    state.progressStage >= APP_CONFIG.api.useFromStage &&
    Boolean(APP_CONFIG.api.endpoint)
  );
}

async function requestApiReply(question) {
  const response = await fetch(APP_CONFIG.api.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      question,
      guideText: state.guideText,
      qnaCards: state.qnaCards,
      progressStage: state.progressStage,
      model: APP_CONFIG.api.model
    })
  });

  const data = await readJsonResponse(response);
  if (!response.ok) {
    throw new Error(data?.message || "API 응답 생성에 실패했습니다.");
  }

  const output = typeof data?.output === "string" ? data.output.trim() : "";
  if (!output) {
    throw new Error("API 응답이 비어 있습니다.");
  }

  return output;
}

function buildIntermediateReply(question) {
  const matched = findBestMatchingCard(question);
  const active = new Set(state.activeGuideFeatures);
  const parts = [];

  if (matched) {
    parts.push(matched.answer);
  } else {
    parts.push("현재 카드 기준으로는 일부 정보만 답변할 수 있습니다.");
  }

  if (active.has("uncertainty")) {
    parts.push("모르는 부분은 먼저 말하고, 확실하지 않은 내용은 확인이 필요하다고 안내합니다.");
  }
  if (active.has("source")) {
    parts.push("가능한 범위에서 출처를 함께 표기합니다.");
  }
  if (active.has("verification")) {
    parts.push("필요하면 미리 입력된 내용과 추가 검색 결과를 함께 검토합니다.");
  }
  if (active.has("bias")) {
    parts.push("다양한 가능성을 고려하고 편향·차별 표현을 피합니다.");
  }

  if (parts.length < 3) {
    parts.push("아직 가이드가 완전하지 않아 일부 답변은 보수적으로 안내됩니다.");
  }

  return parts.join(" ");
}

function buildGuidedLocalReply(question) {
  const matched = findBestMatchingCard(question);
  const active = new Set(state.activeGuideFeatures);
  const parts = [];

  if (matched) {
    parts.push(matched.answer);
  } else {
    parts.push("현재 Q&A 카드만으로는 이 질문을 확정하기 어렵습니다.");
  }

  if (active.has("uncertainty")) {
    parts.push("모르는 부분은 먼저 말하고, 확실하지 않은 내용은 '확인 필요'로 안내합니다.");
  } else if (state.guideScore < 45) {
    parts.push("가이드에 불확실성 처리 규칙이 부족해 답변 신뢰도가 낮을 수 있습니다.");
  }

  if (active.has("source")) {
    parts.push("출처는 교보생명 홈페이지 등 공식 자료를 우선 표기합니다.");
  }

  if (active.has("verification")) {
    parts.push("미리 입력된 내용과 웹 검색 결과를 함께 확인해 교차 검증했습니다.");
  }

  if (active.has("bias")) {
    parts.push("다양한 가능성이 존재할 수 있으므로 편향·차별된 정보는 없는지 검토했습니다.");
  }

  if (active.has("respect")) {
    parts.push("학생을 존중하는 표현을 사용하고 저작권 등 안전 기준을 확인했습니다.");
  }

  if (!matched && (active.has("source") || active.has("verification"))) {
    parts.push("학교 공지, 공식 기관 자료를 확인하면 더 정확한 답을 만들 수 있습니다.");
  }

  return parts.join(" ");
}

function findBestMatchingCard(question) {
  const targetTokens = tokenize(question);
  if (!targetTokens.length) {
    return null;
  }

  let best = null;
  let bestScore = 0;

  state.qnaCards.forEach((card) => {
    const cardTokens = tokenize(card.question);
    const overlap = cardTokens.filter((token) => targetTokens.includes(token)).length;
    const phraseBonus = question.includes(card.question) ? 2 : 0;
    const score = overlap + phraseBonus;
    if (score > bestScore) {
      bestScore = score;
      best = card;
    }
  });

  return bestScore > 0 ? best : null;
}

function findDirectMatchingCard(question) {
  const targetTokens = tokenize(question);
  const normalizedQuestion = targetTokens.join(" ");

  return (
    state.qnaCards.find((card) => tokenize(card.question).join(" ") === normalizedQuestion) ||
    state.qnaCards.find((card) => isDirectQuestionForCard(targetTokens, question, card)) ||
    null
  );
}

function isDirectQuestionForCard(targetTokens, rawQuestion, card) {
  const cardTokens = tokenize(card.question);
  if (!cardTokens.length) {
    return false;
  }

  const cardTokenSet = new Set(cardTokens);
  const targetTokenSet = new Set(targetTokens);
  const allCardTokensIncluded = [...cardTokenSet].every((token) => targetTokenSet.has(token));
  if (allCardTokensIncluded) {
    const allowedExtraTokens = new Set(["알려줘", "알려", "소개", "설명", "설명해줘", "대해", "간단히", "자세히"]);
    const extraTokens = [...targetTokenSet].filter(
      (token) => !cardTokenSet.has(token) && !allowedExtraTokens.has(token)
    );
    return extraTokens.length === 0;
  }

  const normalizedRawQuestion = rawQuestion.toLowerCase();
  const isIdentityCard = cardTokenSet.has("꼬옥이") && cardTokenSet.has("누구");
  const asksIdentity =
    targetTokenSet.has("꼬옥이") &&
    includesAny(normalizedRawQuestion, ["누구", "소개", "대해", "알려", "설명"]);

  return isIdentityCard && asksIdentity;
}

function analyzeAssistantAnswer(text) {
  const lower = text.toLowerCase();

  const biasSignals = ["원래 다", "무조건", "대체로", "일반적으로", "비슷한 패턴", "가정환경은 대체로"];
  const hallucinationSignals = ["확실하다", "100%", "틀림없다", "반드시", "재확인하지 않아도", "예외가 거의 없다"];
  const groundingSignals = ["근거", "출처", "확인", "공식", "자료", "공지"];
  const uncertaintySignals = ["모른", "확인 필요", "추정", "가능성"];

  const biasCount = countHits(lower, biasSignals);
  const hallucinationCount = countHits(lower, hallucinationSignals);
  const groundingCount = countHits(lower, groundingSignals);
  const uncertaintyCount = countHits(lower, uncertaintySignals);

  const biasRisk = Math.min(100, biasCount * 18 + (lower.includes("다 비슷") ? 22 : 0));
  const hallucinationRisk = Math.min(100, hallucinationCount * 20 + (uncertaintyCount === 0 ? 16 : 0));
  const groundingScore = Math.min(100, groundingCount * 22 + uncertaintyCount * 8);

  const notes = [];
  if (biasRisk >= 50) {
    notes.push("편향 경고: 집단 일반화 또는 단정 표현이 보입니다.");
  }
  if (hallucinationRisk >= 50) {
    notes.push("환각 경고: 근거 없이 확신하는 문장이 감지되었습니다.");
  }
  if (groundingScore < 40) {
    notes.push("근거 보강 필요: 출처/확인 절차를 추가해 보세요.");
  }
  if (notes.length === 0) {
    notes.push("양호: 편향/환각 징후가 낮고 근거성이 비교적 안정적입니다.");
  }

  return { biasRisk, hallucinationRisk, groundingScore, notes };
}

function renderResponseDiagnostics(report) {
  if (!report) {
    applyMetric(elements.biasMetric, "-");
    applyMetric(elements.hallucinationMetric, "-");
    applyMetric(elements.groundingMetric, "-");
    elements.responseNotes.innerHTML = "";
    return;
  }

  applyMetric(elements.biasMetric, `${report.biasRisk}점`, true, report.biasRisk);
  applyMetric(elements.hallucinationMetric, `${report.hallucinationRisk}점`, true, report.hallucinationRisk);
  applyMetric(elements.groundingMetric, `${report.groundingScore}점`, false, report.groundingScore);

  elements.responseNotes.innerHTML = "";
  report.notes.forEach((note) => {
    const li = document.createElement("li");
    li.textContent = note;
    elements.responseNotes.appendChild(li);
  });
}

function applyMetric(element, text, isRisk = true, value = 0) {
  element.textContent = text;
  element.classList.remove("risk-high", "risk-mid", "risk-low");
  if (text === "-") {
    return;
  }

  if (isRisk) {
    if (value >= 60) {
      element.classList.add("risk-high");
    } else if (value >= 30) {
      element.classList.add("risk-mid");
    } else {
      element.classList.add("risk-low");
    }
  } else {
    if (value >= 60) {
      element.classList.add("risk-low");
    } else if (value >= 30) {
      element.classList.add("risk-mid");
    } else {
      element.classList.add("risk-high");
    }
  }
}

function applyStateFromHashIfExists() {
  if (!window.location.hash.startsWith("#state=")) {
    return;
  }

  try {
    const encoded = window.location.hash.slice(7);
    const parsed = JSON.parse(fromBase64Unicode(encoded));

    if (Array.isArray(parsed.qnaCards)) {
      state.qnaCards = parsed.qnaCards
        .filter((item) => typeof item?.question === "string" && typeof item?.answer === "string")
        .map((item) => ({
          id: typeof item.id === "string" ? item.id : createId(),
          question: item.question,
          answer: item.answer
        }));
    }
    if (typeof parsed.guideText === "string") {
      state.guideText = parsed.guideText;
      state.guideDraftText = parsed.guideText;
    }
  } catch {
    setStatus("공유 링크 해석에 실패하여 기본 상태로 시작합니다.");
  }
}

function getStoredUnlockedUntil() {
  try {
    const raw = localStorage.getItem(APP_CONFIG.gate.storageKey);
    const value = Number(raw);
    return Number.isFinite(value) ? value : 0;
  } catch {
    return 0;
  }
}

function storeUnlockedUntil(unlockedUntil) {
  try {
    localStorage.setItem(APP_CONFIG.gate.storageKey, String(unlockedUntil));
  } catch {
    // localStorage unavailable: ignore and keep current session unlocked only.
  }
}

function resolveAppConfig(customConfig) {
  const input = customConfig && typeof customConfig === "object" ? customConfig : {};

  const gateInput = input.gate && typeof input.gate === "object" ? input.gate : {};
  const apiInput = input.api && typeof input.api === "object" ? input.api : {};

  return {
    gate: {
      enabled:
        typeof gateInput.enabled === "boolean"
          ? gateInput.enabled
          : DEFAULT_APP_CONFIG.gate.enabled,
      secretCode:
        typeof gateInput.secretCode === "string" && gateInput.secretCode.trim()
          ? gateInput.secretCode
          : DEFAULT_APP_CONFIG.gate.secretCode,
      persistHours:
        Number.isFinite(Number(gateInput.persistHours)) && Number(gateInput.persistHours) > 0
          ? Number(gateInput.persistHours)
          : DEFAULT_APP_CONFIG.gate.persistHours,
      storageKey:
        typeof gateInput.storageKey === "string" && gateInput.storageKey.trim()
          ? gateInput.storageKey
          : DEFAULT_APP_CONFIG.gate.storageKey
    },
    api: {
      enabled:
        typeof apiInput.enabled === "boolean"
          ? apiInput.enabled
          : DEFAULT_APP_CONFIG.api.enabled,
      endpoint:
        typeof apiInput.endpoint === "string" && apiInput.endpoint.trim()
          ? apiInput.endpoint
          : DEFAULT_APP_CONFIG.api.endpoint,
      model:
        typeof apiInput.model === "string" && apiInput.model.trim()
          ? apiInput.model
          : DEFAULT_APP_CONFIG.api.model,
      useFromStage:
        Number.isFinite(Number(apiInput.useFromStage)) && Number(apiInput.useFromStage) > 0
          ? Number(apiInput.useFromStage)
          : DEFAULT_APP_CONFIG.api.useFromStage,
      fallbackToLocal:
        typeof apiInput.fallbackToLocal === "boolean"
          ? apiInput.fallbackToLocal
          : DEFAULT_APP_CONFIG.api.fallbackToLocal
    }
  };
}

function cloneDefaultCards() {
  return DEFAULT_QNA_CARDS.map((card) => ({ ...card, id: createId() }));
}

function tokenize(value) {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .map(normalizeToken)
    .filter((token) => token.length >= 2);
}

function normalizeToken(token) {
  return token.replace(
    /(이에요|예요|입니다|인가요|인가|이야|에게|한테|에서|으로|까지|부터|처럼|보다|하고|이랑|랑|과|와|야|은|는|이|가|을|를|의|에|도|만|로)$/u,
    ""
  );
}

function countHits(text, keywords) {
  return keywords.filter((keyword) => text.includes(keyword)).length;
}

function includesAny(text, keywords) {
  const normalized = String(text || "").toLowerCase();
  return keywords.some((keyword) => normalized.includes(keyword.toLowerCase()));
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setStatus(message) {
  elements.statusText.textContent = message;
}

async function readJsonResponse(response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

function createId() {
  return `id_${Math.random().toString(36).slice(2, 10)}`;
}

function toBase64Unicode(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function fromBase64Unicode(base64Text) {
  const binary = atob(base64Text);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}
