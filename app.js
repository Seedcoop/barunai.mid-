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

const LOCKED_QNA_GROUPS = [
  {
    id: "mother",
    title: "엄마",
    cards: [
      {
        question: "꼬옥이의 엄마는?",
        answer: [
          "꼬옥이의 엄마는 42세예요.",
          "대범하고 도전적인 열정 펭귄입니다.",
          "생활력이 강하고 정보 수집에 능하며, 건강한 음식 이야기를 블로그에 기록하는 캐릭터예요."
        ].join("\n")
      }
    ]
  },
  {
    id: "father",
    title: "아빠",
    cards: [
      {
        question: "꼬옥이의 아빠는?",
        answer: [
          "꼬옥이의 아빠는 45세예요.",
          "큰 덩치와 달리 걱정이 많고 세심한 편입니다.",
          "분석하고 예측하는 것을 좋아하는 데이터 분석가 성향의 캐릭터예요."
        ].join("\n")
      }
    ]
  },
  {
    id: "komul",
    title: "꼬물",
    cards: [
      {
        question: "꼬옥이의 동생은?",
        answer: [
          "꼬옥이의 동생은 꼬물이에요.",
          "꼬물은 1세이고, 겁도 많지만 호기심도 많은 황제펭귄입니다.",
          "아직 어려서 가족 곁에 붙어 지내고, 꼬옥이와 함께 마을 이야기를 듣는 것을 좋아해요."
        ].join("\n")
      }
    ]
  },
  {
    id: "grandmother",
    title: "할머니",
    cards: [
      {
        question: "꼬옥이의 할머니는?",
        answer: [
          "꼬옥이의 할머니는 70세예요.",
          "쿨하고 유쾌하지만 정이 많은 캐릭터입니다.",
          "새로운 도전과 배움을 좋아하고, 북디자이너로 활동하다가 소설가인 할아버지를 만났어요."
        ].join("\n")
      }
    ]
  },
  {
    id: "grandfather",
    title: "할아버지",
    cards: [
      {
        question: "꼬옥이의 할아버지는?",
        answer: [
          "꼬옥이의 할아버지는 68세예요.",
          "할머니와 손주들에게 다정한 스윗가이입니다.",
          "전직 유명 소설가였고, 암투병을 이겨낸 뒤 새로운 삶을 살고 있는 캐릭터예요."
        ].join("\n")
      }
    ]
  }
];

const DEFAULT_GUIDE_CARDS = [
  {
    id: "guide_speed",
    title: "지침 카드 1",
    text: "질문을 받으면 점검 과정 없이 단정적으로 답한다."
  },
  {
    id: "guide_generalize",
    title: "지침 카드 2",
    text: "일부 사례만 보고 사람들을 하나로 묶어 해석한다."
  },
  {
    id: "guide_guess",
    title: "지침 카드 3",
    text: "불분명한 내용도 그럴듯하게 이어서 말한다."
  },
  {
    id: "guide_source",
    title: "지침 카드 4",
    text: "참고한 정보가 무엇인지 밝히지 않는다."
  }
];

const GUIDE_FEATURES = [
  {
    id: "uncertainty",
    title: "불확실성 고지",
    keywords: [
      "모르는 부분은 먼저 말함",
      "모르면 먼저 말함",
      "모르면 모른다고",
      "모르는 것은 모른다고",
      "모르는 건 모른다고",
      "모르는 내용은 모른다고",
      "모르는 정보는 모른다고",
      "알 수 없으면",
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
      "점검하고",
      "점검한다",
      "확인하고",
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

const GUIDE_FEATURE_PATTERNS = {
  uncertainty: [
    /모르[^\n.?!]*(말|답|안내|고지|밝|인정|표시)/u,
    /알\s*수\s*없[^\n.?!]*(말|답|안내|고지|밝|표시)/u,
    /(확실하지|불확실|불분명|명확하지|애매)[^\n.?!]*(안내|고지|확인|표시)/u,
    /확실하지[^\n.?!]*(말|답)/u,
    /(정보|자료|근거|카드)[^\n.?!]*(없|부족|확인할\s*수\s*없)[^\n.?!]*(추측|단정|말|답|안내)/u,
    /(추측|지어내|꾸며내|상상|단정|임의로)[^\n.?!]*(하지\s*않|않는다|말지|금지|피한다)/u,
    /확인[^\n.?!]*(필요|불가|어려|되지\s*않|안\s*된)/u
  ],
  source: [
    /(출처|근거)[^\n.?!]*(밝|표기|제시|말|안내|함께|남긴|적)/u,
    /(공식|신뢰할\s*수\s*있는)[^\n.?!]*(자료|문서|홈페이지|사이트|정보)/u,
    /(참고\s*자료|원문|링크|자료\s*출처)/u,
    /(카드|자료)[^\n.?!]*(기준|근거)[^\n.?!]*(말|답|안내)/u
  ],
  verification: [
    /(검증|점검|검토|확인)[^\n.?!]*(하고|한다|한\s*뒤|후|해서|하여|해야|하라|하기|거친)/u,
    /답[^\n.?!]*(전|하기\s*전)[^\n.?!]*(검증|점검|검토|확인)/u,
    /(사실\s*확인|교차\s*검증|교차\s*확인|재확인|대조|비교|검색|찾아보|살펴보)/u
  ],
  bias: [
    /(편향|차별|고정\s*관념|편견)[^\n.?!]*(피|막|금지|않|검토|주의|줄)/u,
    /(일반화|단정)[^\n.?!]*(금지|하지\s*않|않는다|피한다|주의)/u,
    /(모두|전부|항상|무조건)[^\n.?!]*(같|그렇)[^\n.?!]*(말하지|단정하지|일반화하지)/u,
    /(성별|나이|외모|지역|장애|국적|종교|문화)[^\n.?!]*(차별|비하|편견|고정\s*관념)/u
  ],
  respect: [
    /(존중|친절|예의|배려)[^\n.?!]*(표현|말|답|대화|사용)/u,
    /(혐오|비하|욕설|폭력|공격적|상처)[^\n.?!]*(금지|피|않|사용하지|조장하지)/u,
    /(개인정보|사생활|저작권|안전)[^\n.?!]*(보호|확인|주의|지킨|침해하지)/u
  ]
};

const GUIDE_FEATURE_NEGATIONS = {
  uncertainty: [
    /(모르|알\s*수\s*없|불확실|확실하지|추측|지어내|단정)[^\n.?!]{0,12}(무시|생략|말하지\s*않|고지하지\s*않)/u
  ],
  source: [
    /(출처|근거|참고한\s*정보|자료)[^\n.?!]{0,24}(밝히지\s*않|표기하지\s*않|제시하지\s*않|숨긴)/u
  ],
  verification: [
    /(검증|점검|검토|확인|검색)[^\n.?!]{0,10}(없이|생략|하지\s*않|안\s*하|불필요)/u
  ],
  bias: [
    /(편향|차별|고정\s*관념|일반화)[^\n.?!]{0,12}(허용|그대로|괜찮)/u
  ],
  respect: [
    /(혐오|비하|욕설|폭력)[^\n.?!]{0,12}(허용|괜찮|사용)/u
  ]
};

const DEFAULT_APP_CONFIG = {
  gate: {
    enabled: true,
    secretCode: "KYOBO",
    persistHours: 12,
    storageKey: "barunai_gate_session"
  },
  rounds: {
    maxRound: 6,
    questionLimit: 3,
    guideEditLimit: 1,
    guideCharLimit: 70,
    passcodes: ["근거", "출처", "검증", "책임", "존중"]
  },
  api: {
    enabled: true,
    endpoint: "/api/chat",
    model: "gpt-5-mini",
    useFromStage: 1,
    fallbackToLocal: true
  }
};

const APP_CONFIG = resolveAppConfig(window.BARUNAI_APP_CONFIG);
const initialGuideCards = cloneDefaultGuideCards();

const state = {
  qnaCards: cloneDefaultCards(),
  guideCards: initialGuideCards,
  guideText: buildGuideText(initialGuideCards),
  guideDraftText: buildGuideText(initialGuideCards),
  guideScore: 0,
  progressStage: 1,
  activeGuideFeatures: [],
  isUnlocked: false,
  isSending: false,
  accessCode: "",
  currentRound: 1,
  questionCount: 0,
  guideEditsThisRound: 0,
  unlockedQnaGroups: [],
  messages: []
};

const elements = {
  gateOverlay: document.getElementById("gateOverlay"),
  gateCodeInput: document.getElementById("gateCodeInput"),
  gateUnlockBtn: document.getElementById("gateUnlockBtn"),
  gateMessage: document.getElementById("gateMessage"),
  sessionChip: document.getElementById("sessionChip"),
  tabPracticeBtn: document.getElementById("tabPracticeBtn"),
  tabGuideBtn: document.getElementById("tabGuideBtn"),
  tabPracticePage: document.getElementById("tabPracticePage"),
  tabGuidePage: document.getElementById("tabGuidePage"),
  qnaList: document.getElementById("qnaList"),
  guideSaveStatus: document.getElementById("guideSaveStatus"),
  guideCardList: document.getElementById("guideCardList"),
  roundControlBox: document.getElementById("roundControlBox"),
  roundUnlockPanel: document.getElementById("roundUnlockPanel"),
  roundCodeInput: document.getElementById("roundCodeInput"),
  roundUnlockBtn: document.getElementById("roundUnlockBtn"),
  roundCodeMessage: document.getElementById("roundCodeMessage"),
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
  syncGuideTextFromCards();
  bindEvents();
  activateTab("practice");
  renderQnaCards();
  renderGuideCards();
  runGuideDiagnostics(state.guideText);
  updateRoundUi();
  elements.guideSaveStatus.textContent = "현재 저장된 가이드가 적용 중입니다.";
  elements.guideSaveStatus.classList.add("saved");
  seedConversation();
  initGate();
}

function initGate() {
  if (!APP_CONFIG.gate.enabled) {
    applyAccessSession({
      code: APP_CONFIG.gate.secretCode
    });
    unlockApp("게이트가 비활성화되어 바로 시작합니다.");
    return;
  }

  const storedSession = getStoredGateSession();
  if (storedSession) {
    applyAccessSession(storedSession);
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

  const accessSession = parseAccessCode(enteredCode);
  if (!accessSession) {
    setGateMessage("입장 코드가 올바르지 않습니다. KYOBO를 확인해 주세요.", true);
    return;
  }

  const persistMs = Math.max(1, APP_CONFIG.gate.persistHours) * 60 * 60 * 1000;
  const unlockedUntil = Date.now() + persistMs;
  storeGateSession({ ...accessSession, unlockedUntil });
  applyAccessSession(accessSession);
  unlockApp("인증되었습니다. 실습을 시작하세요.");
}

function applyAccessSession(session) {
  state.accessCode = session.code;
  restoreRoundState();
  syncGuideTextFromCards();
  renderGuideCards();
  runGuideDiagnostics(state.guideText);
  updateRoundUi();
}

function unlockApp(message) {
  state.isUnlocked = true;
  document.body.classList.remove("app-locked");
  elements.gateOverlay.classList.add("hidden");
  setGateMessage(message, false);
  updateRoundUi();
  setStatus(buildReadyStatus());
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
    saveRoundState();
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
    state.unlockedQnaGroups = state.unlockedQnaGroups.filter((groupId) =>
      state.qnaCards.some((card) => card.unlockGroupId === groupId)
    );
    saveRoundState();
    renderQnaCards();
    setStatus("Q&A 카드를 삭제했습니다.");
  });

  elements.guideCardList.addEventListener("input", (event) => {
    const textarea = event.target.closest(".guide-card-textarea");
    if (!textarea) {
      return;
    }
    const cardEl = textarea.closest(".guide-card");
    state.guideDraftText = collectGuideDraftText();
    updateGuideCardMeta(cardEl, textarea.value);
    setGuideCardMessage(cardEl, "저장 전입니다.", "");
    elements.guideSaveStatus.textContent = "변경사항이 있습니다. 카드 저장을 눌러 반영하세요.";
    elements.guideSaveStatus.classList.remove("saved");
  });

  elements.guideCardList.addEventListener("click", (event) => {
    const saveButton = event.target.closest("[data-action='save-guide-card']");
    if (!saveButton) {
      return;
    }
    const cardEl = saveButton.closest(".guide-card");
    saveGuideCard(cardEl);
  });

  elements.roundUnlockBtn.addEventListener("click", tryUnlockNextRound);
  elements.roundCodeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      tryUnlockNextRound();
    }
  });

  elements.sendBtn.addEventListener("click", handleSendQuestion);
  elements.chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendQuestion();
    }
  });

  elements.resetBtn.addEventListener("click", () => {
    state.qnaCards = cloneDefaultCards();
    state.guideCards = cloneDefaultGuideCards();
    syncGuideTextFromCards();
    state.currentRound = 1;
    state.questionCount = 0;
    state.guideEditsThisRound = 0;
    state.unlockedQnaGroups = [];
    clearRoundState();
    elements.guideSaveStatus.textContent = "아직 저장되지 않았습니다.";
    elements.guideSaveStatus.classList.remove("saved");
    renderQnaCards();
    renderGuideCards();
    runGuideDiagnostics(state.guideText);
    updateRoundUi();
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

function renderGuideCards() {
  elements.guideCardList.innerHTML = "";

  const canEdit = canEditGuideThisRound();
  const charLimit = APP_CONFIG.rounds.guideCharLimit;

  state.guideCards.forEach((card, index) => {
    const cardEl = document.createElement("article");
    cardEl.className = `guide-card ${canEdit ? "" : "locked"}`.trim();
    cardEl.dataset.id = card.id;
    cardEl.innerHTML = `
      <div class="guide-card-top">
        <p class="guide-card-title">${escapeHtml(card.title || `지침 카드 ${index + 1}`)}</p>
        <p class="guide-card-meta">${String(card.text || "").length}/${charLimit}자</p>
      </div>
      <textarea
        class="guide-card-textarea"
        maxlength="${charLimit}"
        spellcheck="false"
        ${canEdit ? "" : "disabled"}
        aria-label="${escapeHtml(card.title || `지침 카드 ${index + 1}`)} 수정"
      >${escapeHtml(card.text)}</textarea>
      <div class="guide-card-actions">
        <button class="btn btn-primary" type="button" data-action="save-guide-card" ${canEdit ? "" : "disabled"}>
          이 카드 저장
        </button>
        <p class="guide-card-message">${canEdit ? "한 문장으로 고쳐 보세요." : "암호 입력 후 수정할 수 있습니다."}</p>
      </div>
    `;
    elements.guideCardList.appendChild(cardEl);
  });
}

function updateGuideCardMeta(cardEl, draft) {
  if (!cardEl) {
    return;
  }
  const meta = cardEl.querySelector(".guide-card-meta");
  if (meta) {
    meta.textContent = `${String(draft || "").length}/${APP_CONFIG.rounds.guideCharLimit}자`;
  }
}

function setGuideCardMessage(cardEl, message, variant) {
  if (!cardEl) {
    return;
  }
  const messageEl = cardEl.querySelector(".guide-card-message");
  if (!messageEl) {
    return;
  }
  messageEl.textContent = message;
  messageEl.classList.remove("error", "success");
  if (variant) {
    messageEl.classList.add(variant);
  }
}

function saveGuideCard(cardEl) {
  if (!cardEl) {
    return;
  }

  if (!canEditGuideThisRound()) {
    setGuideCardMessage(cardEl, "현재 수정 기회를 이미 사용했습니다.", "error");
    updateRoundUi();
    return;
  }

  const targetCard = state.guideCards.find((card) => card.id === cardEl.dataset.id);
  const textarea = cardEl.querySelector(".guide-card-textarea");
  if (!targetCard || !textarea) {
    return;
  }

  const rawDraft = textarea.value;
  const draft = normalizeGuideSentence(rawDraft);
  const validation = validateGuideSentence(draft, rawDraft);
  if (!validation.ok) {
    setGuideCardMessage(cardEl, validation.message, "error");
    return;
  }

  if (draft === targetCard.text) {
    setGuideCardMessage(cardEl, "바뀐 내용이 없습니다.", "error");
    return;
  }

  targetCard.text = draft;
  state.guideEditsThisRound += 1;
  syncGuideTextFromCards();
  runGuideDiagnostics(state.guideText);
  saveRoundState();
  renderGuideCards();
  updateRoundUi();
  elements.guideSaveStatus.textContent = "저장 완료: 선택한 지침 카드가 챗봇에 반영되었습니다.";
  elements.guideSaveStatus.classList.add("saved");
  setStatus("가이드 카드 1개를 저장했습니다. Q&A 실습 탭에서 응답 변화를 확인하세요.");
}

function normalizeGuideSentence(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

function validateGuideSentence(text, rawText = text) {
  if (!text) {
    return { ok: false, message: "문장을 입력해 주세요." };
  }
  if (text.length < 12) {
    return { ok: false, message: "지침이 너무 짧습니다. 한 문장으로 조금 더 구체화해 주세요." };
  }
  if (text.length > APP_CONFIG.rounds.guideCharLimit) {
    return { ok: false, message: `${APP_CONFIG.rounds.guideCharLimit}자 이내로 작성해 주세요.` };
  }
  if (/[\n\r]/.test(rawText)) {
    return { ok: false, message: "카드 하나에는 한 문장만 넣을 수 있습니다." };
  }

  const sentenceMarks = text.match(/[.!?。？！]/g) || [];
  if (sentenceMarks.length > 1) {
    return { ok: false, message: "한 카드에는 지침 한 문장만 저장할 수 있습니다." };
  }
  if (!/[.!?。？！]$/.test(text) && !/(다|요|함|하기)$/.test(text)) {
    return { ok: false, message: "완성된 문장 형태로 마무리해 주세요." };
  }

  return { ok: true, message: "" };
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
  const compact = compactGuideText(normalized);
  let score = 10;
  const notes = [];
  const featureStates = GUIDE_FEATURES.map((feature) => {
    const active = isGuideFeatureActive(feature, normalized, compact);
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

  const riskyCount = countRiskyGuideSignals(normalized, compact);
  if (riskyCount > 0) {
    score -= Math.min(30, riskyCount * 10);
    notes.push(`주의: 단정/환각 위험 표현 ${riskyCount}개가 감지되었습니다.`);
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

function isGuideFeatureActive(feature, normalized, compact) {
  const negations = GUIDE_FEATURE_NEGATIONS[feature.id] || [];
  const hasNegation = negations.some((pattern) => pattern.test(normalized));
  if (hasNegation) {
    return false;
  }

  const keywordMatch = feature.keywords.some((keyword) => {
    const keywordText = keyword.toLowerCase();
    return normalized.includes(keywordText) || compact.includes(compactGuideText(keywordText));
  });
  if (keywordMatch) {
    return true;
  }

  const patterns = GUIDE_FEATURE_PATTERNS[feature.id] || [];
  return patterns.some((pattern) => pattern.test(normalized));
}

function countRiskyGuideSignals(normalized, compact) {
  const riskyPatterns = [
    /무조건[^\n.?!]*(답|말|따르|믿)/u,
    /절대[^\n.?!]*(맞|틀리|확실|변하지)/u,
    /(사실\s*확인|검증|점검|확인)[^\n.?!]*(없이|생략)/u,
    /근거\s*없이[^\n.?!]*(답|말|단정|추측)/u,
    /(지어내|꾸며내|상상)[^\n.?!]*(말|답|이어|만들)/u,
    /불분명[^\n.?!]*(그럴듯|이어\s*말|단정)/u,
    /(한쪽\s*의견만|하나로\s*묶|모두\s*같)/u
  ];
  const riskyCompacts = ["점검없이", "확인없이", "검증없이", "근거없이"];

  let count = riskyPatterns.filter((pattern) => pattern.test(normalized)).length;
  count += riskyCompacts.filter((signal) => compact.includes(signal)).length;
  return count;
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
      ? "초기 응답 패턴"
      : stage === 2
        ? "개선 반영 중"
        : "안정화 반영 중";

  elements.progressStageLabel.textContent = stageLabel;
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

  if (isChatLocked()) {
    setStatus("암호 입력이 필요합니다.");
    updateRoundUi();
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
  state.questionCount += 1;
  saveRoundState();
  elements.chatInput.value = "";
  renderMessages();

  state.isSending = true;
  updateRoundUi();
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
    setStatus(`응답 생성 완료: 질문 가능 횟수 ${getQuestionsLeft()}회 남음 · ${sourceLabel}`);
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
    updateRoundUi();
  }
}

function updateRoundUi() {
  const maxRound = APP_CONFIG.rounds.maxRound;
  const guideEditsLeft = getGuideEditsLeft();
  const chatLocked = isChatLocked();
  const guideLocked = guideEditsLeft <= 0;

  const canAsk = state.isUnlocked && !state.isSending && !chatLocked;
  elements.chatInput.disabled = !canAsk;
  elements.sendBtn.disabled = !canAsk;
  elements.chatInput.placeholder = chatLocked ? "암호 입력이 필요합니다." : "질문 입력하기...";

  const canAdvance = state.currentRound < maxRound;
  const shouldShowUnlock = state.isUnlocked && canAdvance && (chatLocked || guideLocked);
  elements.roundControlBox.classList.toggle("hidden", !shouldShowUnlock);
  elements.roundUnlockPanel.classList.toggle("hidden", !shouldShowUnlock);

  elements.sessionChip.textContent = buildSessionLabel();
}

function getQuestionsLeft() {
  return Math.max(0, APP_CONFIG.rounds.questionLimit - state.questionCount);
}

function getGuideEditsLeft() {
  return Math.max(0, APP_CONFIG.rounds.guideEditLimit - state.guideEditsThisRound);
}

function isChatLocked() {
  return state.questionCount >= APP_CONFIG.rounds.questionLimit;
}

function canEditGuideThisRound() {
  return state.guideEditsThisRound < APP_CONFIG.rounds.guideEditLimit;
}

function tryUnlockNextRound() {
  if (state.currentRound >= APP_CONFIG.rounds.maxRound) {
    setRoundCodeMessage("마지막 단계입니다.", "error");
    return;
  }

  const enteredCode = elements.roundCodeInput.value;
  if (!enteredCode.trim()) {
    setRoundCodeMessage("암호를 입력해 주세요.", "error");
    return;
  }

  const expectedCode = getNextRoundPasscode();
  if (normalizePasscode(enteredCode) !== normalizePasscode(expectedCode)) {
    setRoundCodeMessage("암호가 맞지 않습니다. 선생님 안내를 다시 확인해 주세요.", "error");
    return;
  }

  state.currentRound += 1;
  state.questionCount = 0;
  state.guideEditsThisRound = 0;
  const unlockedGroup = unlockNextQnaGroup();
  elements.roundCodeInput.value = "";
  setRoundCodeMessage("입력이 다시 열렸습니다.", "success");
  saveRoundState();
  renderQnaCards();
  renderGuideCards();
  updateRoundUi();
  state.messages.push({
    role: "assistant",
    variant: "note",
    text: unlockedGroup
      ? `질문 3회와 가이드 카드 수정 1회가 다시 가능합니다. ${unlockedGroup.title} Q&A 카드가 추가되었습니다.`
      : "질문 3회와 가이드 카드 수정 1회가 다시 가능합니다."
  });
  renderMessages();
  setStatus(unlockedGroup ? `${unlockedGroup.title} Q&A 카드가 추가되었습니다.` : "입력이 다시 열렸습니다.");
}

function unlockNextQnaGroup() {
  const nextGroup = LOCKED_QNA_GROUPS.find((group) => !state.unlockedQnaGroups.includes(group.id));
  if (!nextGroup) {
    return null;
  }

  state.unlockedQnaGroups.push(nextGroup.id);
  state.qnaCards.push(...cloneLockedQnaCards(nextGroup));
  return nextGroup;
}

function setRoundCodeMessage(message, variant) {
  elements.roundCodeMessage.textContent = message;
  elements.roundCodeMessage.classList.remove("error", "success");
  if (variant) {
    elements.roundCodeMessage.classList.add(variant);
  }
}

function getNextRoundPasscode() {
  return (
    APP_CONFIG.rounds.passcodes[state.currentRound - 1] ||
    DEFAULT_APP_CONFIG.rounds.passcodes[state.currentRound - 1] ||
    `ROUND${state.currentRound + 1}`
  );
}

function normalizePasscode(value) {
  return String(value || "").replace(/\s+/g, "").toUpperCase();
}

function buildSessionLabel() {
  if (!state.accessCode) {
    return "입장 전";
  }
  return state.accessCode;
}

function buildReadyStatus() {
  if (!state.accessCode) {
    return "준비 완료. 질문을 보내 보세요.";
  }
  return `${state.accessCode} 코드로 입장했습니다. 질문을 보내 보세요.`;
}

function buildUnsafeLocalReply(question) {
  const directMatch = findDirectMatchingCard(question);
  if (directMatch) {
    return directMatch.answer;
  }

  const matched = findBestMatchingCard(question);
  const suffix = buildUnsafeSuffix(question);

  if (matched) {
    if (asksPreference(question)) {
      return `${matched.answer}\n\n${buildUnsafeInference(question)}`;
    }
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

function buildUnsafeInference(question) {
  if (includesAny(question, ["좋아", "취향", "좋아해", "선호"])) {
    return "아마 생선을 좋아할 겁니다. 황제펭귄이라는 점을 보면 그런 느낌이 들어요. 따로 확인하지 않아도 자연스럽게 그렇게 봐도 괜찮습니다.";
  }
  if (includesAny(question, ["잘해", "특기", "능력"])) {
    return "아마 주변을 돕는 일은 꽤 잘할 겁니다. 늘 부지런히 움직인다는 설명을 보면 그런 성향이 강하다는 느낌이 들어요.";
  }
  return "카드에 직접 적힌 내용은 아니지만, 전체 분위기를 보면 그렇게 해석해도 크게 어색하지 않습니다.";
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
        text:
          state.progressStage === 1
            ? buildUnsafeLocalReply(question)
            : buildLocalImprovedReply(question),
        source: "fallback"
      };
    }
  }

  return {
    text:
      state.progressStage === 1
        ? buildUnsafeLocalReply(question)
        : buildLocalImprovedReply(question),
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

  if (asksPreference(question) && active.has("uncertainty")) {
    parts.push("현재 Q&A 카드 기준으로는 꼬옥이가 좋아하는 음식이나 취향을 확인할 수 없습니다.");
    parts.push("카드에 직접 적혀 있지 않은 내용은 추측하지 않고 확인이 필요하다고 안내합니다.");
    if (active.has("verification")) {
      parts.push("필요하면 공식 자료나 추가 정보를 점검한 뒤 답해야 합니다.");
    }
    return parts.join(" ");
  }

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

  if (asksPreference(question) && active.has("uncertainty")) {
    parts.push("현재 Q&A 카드 기준으로는 꼬옥이가 좋아하는 음식이나 취향을 확인할 수 없습니다.");
    parts.push("카드에 직접 적힌 근거가 없으므로 생선처럼 그럴듯한 답을 추측하지 않습니다.");
    if (active.has("source") || active.has("verification")) {
      parts.push("정확한 답이 필요하면 공식 자료나 추가 정보를 확인해야 합니다.");
    }
    return parts.join(" ");
  }

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
  const hallucinationSignals = [
    "확실하다",
    "100%",
    "틀림없다",
    "반드시",
    "재확인하지 않아도",
    "예외가 거의 없다",
    "아마",
    "그런 느낌",
    "것 같습니다",
    "겁니다"
  ];
  const groundingSignals = ["근거", "출처", "확인", "공식", "자료", "공지"];
  const uncertaintySignals = [
    "모른",
    "확인 필요",
    "확인이 필요",
    "확인할 수 없",
    "알 수 없",
    "추측하지 않",
    "카드 기준",
    "추정",
    "가능성"
  ];

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
      state.qnaCards = normalizeQnaCards(parsed.qnaCards);
    }
    if (Array.isArray(parsed.unlockedQnaGroups)) {
      state.unlockedQnaGroups = parsed.unlockedQnaGroups
        .map((value) => String(value))
        .filter((groupId) => LOCKED_QNA_GROUPS.some((group) => group.id === groupId));
    }
    if (Array.isArray(parsed.guideCards)) {
      state.guideCards = normalizeGuideCards(parsed.guideCards);
      syncGuideTextFromCards();
    } else if (typeof parsed.guideText === "string") {
      state.guideCards = guideTextToCards(parsed.guideText);
      syncGuideTextFromCards();
    }
  } catch {
    setStatus("상태 해석에 실패하여 기본 상태로 시작합니다.");
  }
}

function parseAccessCode(code) {
  const normalized = String(code || "").trim().toUpperCase();
  const expectedCode = APP_CONFIG.gate.secretCode.toUpperCase();
  return normalized === expectedCode ? { code: expectedCode } : null;
}

function getStoredGateSession() {
  try {
    const raw = localStorage.getItem(APP_CONFIG.gate.storageKey);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || Number(parsed.unlockedUntil) <= Date.now()) {
      return null;
    }
    const accessSession = parseAccessCode(parsed.code);
    return accessSession ? accessSession : null;
  } catch {
    return null;
  }
}

function storeGateSession(session) {
  try {
    localStorage.setItem(APP_CONFIG.gate.storageKey, JSON.stringify(session));
  } catch {
    // localStorage unavailable: ignore and keep current session unlocked only.
  }
}

function getRoundStorageKey() {
  return `barunai_mid_round_state_${state.accessCode || "guest"}`;
}

function restoreRoundState() {
  try {
    const raw = localStorage.getItem(getRoundStorageKey());
    if (!raw) {
      return;
    }
    const parsed = JSON.parse(raw);
    state.currentRound = clampNumber(parsed.currentRound, 1, APP_CONFIG.rounds.maxRound, 1);
    state.questionCount = clampNumber(parsed.questionCount, 0, APP_CONFIG.rounds.questionLimit, 0);
    state.guideEditsThisRound = clampNumber(parsed.guideEditsThisRound, 0, APP_CONFIG.rounds.guideEditLimit, 0);
    if (Array.isArray(parsed.qnaCards)) {
      state.qnaCards = normalizeQnaCards(parsed.qnaCards);
    }
    if (Array.isArray(parsed.unlockedQnaGroups)) {
      state.unlockedQnaGroups = parsed.unlockedQnaGroups
        .map((value) => String(value))
        .filter((groupId) => LOCKED_QNA_GROUPS.some((group) => group.id === groupId));
    }
    if (Array.isArray(parsed.guideCards)) {
      state.guideCards = normalizeGuideCards(parsed.guideCards);
    }
  } catch {
    // If saved state is malformed, continue with the current in-memory state.
  }
}

function saveRoundState() {
  if (!state.accessCode) {
    return;
  }
  try {
    localStorage.setItem(
      getRoundStorageKey(),
      JSON.stringify({
        currentRound: state.currentRound,
        questionCount: state.questionCount,
        guideEditsThisRound: state.guideEditsThisRound,
        qnaCards: state.qnaCards,
        unlockedQnaGroups: state.unlockedQnaGroups,
        guideCards: state.guideCards
      })
    );
  } catch {
    // localStorage unavailable: keep session state in memory only.
  }
}

function clearRoundState() {
  try {
    localStorage.removeItem(getRoundStorageKey());
  } catch {
    // localStorage unavailable: nothing to clear.
  }
}

function resolveAppConfig(customConfig) {
  const input = customConfig && typeof customConfig === "object" ? customConfig : {};

  const gateInput = input.gate && typeof input.gate === "object" ? input.gate : {};
  const roundsInput = input.rounds && typeof input.rounds === "object" ? input.rounds : {};
  const apiInput = input.api && typeof input.api === "object" ? input.api : {};

  return {
    gate: {
      enabled:
        typeof gateInput.enabled === "boolean"
          ? gateInput.enabled
          : DEFAULT_APP_CONFIG.gate.enabled,
      secretCode:
        typeof gateInput.secretCode === "string" && gateInput.secretCode.trim()
          ? gateInput.secretCode.trim().toUpperCase()
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
    rounds: {
      maxRound:
        Number.isFinite(Number(roundsInput.maxRound)) && Number(roundsInput.maxRound) > 1
          ? Number(roundsInput.maxRound)
          : DEFAULT_APP_CONFIG.rounds.maxRound,
      questionLimit:
        Number.isFinite(Number(roundsInput.questionLimit)) && Number(roundsInput.questionLimit) > 0
          ? Number(roundsInput.questionLimit)
          : DEFAULT_APP_CONFIG.rounds.questionLimit,
      guideEditLimit:
        Number.isFinite(Number(roundsInput.guideEditLimit)) && Number(roundsInput.guideEditLimit) > 0
          ? Number(roundsInput.guideEditLimit)
          : DEFAULT_APP_CONFIG.rounds.guideEditLimit,
      guideCharLimit:
        Number.isFinite(Number(roundsInput.guideCharLimit)) && Number(roundsInput.guideCharLimit) >= 30
          ? Number(roundsInput.guideCharLimit)
          : DEFAULT_APP_CONFIG.rounds.guideCharLimit,
      passcodes:
        Array.isArray(roundsInput.passcodes) && roundsInput.passcodes.length > 0
          ? roundsInput.passcodes.map((code) => String(code)).filter((code) => code.trim())
          : DEFAULT_APP_CONFIG.rounds.passcodes
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

function cloneLockedQnaCards(group) {
  return group.cards.map((card) => ({
    id: createId(),
    unlockGroupId: group.id,
    question: card.question,
    answer: card.answer
  }));
}

function normalizeQnaCards(cards) {
  const normalized = cards
    .filter((item) => typeof item?.question === "string" && typeof item?.answer === "string")
    .map((item) => ({
      id: typeof item.id === "string" && item.id ? item.id : createId(),
      unlockGroupId:
        typeof item.unlockGroupId === "string" &&
        LOCKED_QNA_GROUPS.some((group) => group.id === item.unlockGroupId)
          ? item.unlockGroupId
          : undefined,
      question: item.question,
      answer: item.answer
    }));

  return normalized.length ? normalized : cloneDefaultCards();
}

function cloneDefaultGuideCards() {
  return DEFAULT_GUIDE_CARDS.map((card, index) => ({
    id: card.id || createId(),
    title: card.title || `지침 카드 ${index + 1}`,
    text: card.text
  }));
}

function normalizeGuideCards(cards) {
  const normalized = cards
    .filter((item) => typeof item?.text === "string")
    .map((item, index) => ({
      id: typeof item.id === "string" && item.id.trim() ? item.id : createId(),
      title: typeof item.title === "string" && item.title.trim() ? item.title : `지침 카드 ${index + 1}`,
      text: normalizeGuideSentence(item.text).slice(0, APP_CONFIG.rounds.guideCharLimit)
    }));

  return normalized.length ? normalized : cloneDefaultGuideCards();
}

function guideTextToCards(text) {
  const lines = String(text || "")
    .split(/\n+/)
    .map((line) => line.replace(/^[-#\s]+/, "").trim())
    .filter(Boolean);

  if (!lines.length) {
    return cloneDefaultGuideCards();
  }

  return lines.slice(0, 6).map((line, index) => ({
    id: createId(),
    title: `지침 카드 ${index + 1}`,
    text: normalizeGuideSentence(line).slice(0, APP_CONFIG.rounds.guideCharLimit)
  }));
}

function buildGuideText(cards) {
  return cards.map((card) => card.text).filter(Boolean).join("\n");
}

function syncGuideTextFromCards() {
  state.guideText = buildGuideText(state.guideCards);
  state.guideDraftText = state.guideText;
}

function collectGuideDraftText() {
  const textareas = [...elements.guideCardList.querySelectorAll(".guide-card-textarea")];
  if (!textareas.length) {
    return state.guideText;
  }
  return textareas.map((textarea) => normalizeGuideSentence(textarea.value)).filter(Boolean).join("\n");
}

function clampNumber(value, min, max, fallback) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return fallback;
  }
  return Math.max(min, Math.min(max, Math.floor(numeric)));
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

function compactGuideText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "");
}

function asksPreference(question) {
  return includesAny(question, ["좋아", "취향", "선호"]);
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
