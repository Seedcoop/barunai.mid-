/**
 * 수업 운영용 설정 파일
 * - 입장 코드: gate.secretCode 값을 바꾸면 됩니다.
 * - 다음 활동 암호: rounds.passcodes 값을 바꾸면 됩니다.
 * - GitHub 공개 배포 시 API Key는 이 파일에 넣지 마세요.
 */
window.BARUNAI_APP_CONFIG = {
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
    passcodes: ["안전", "정확", "존중", "주체성", "책임"]
  },
  api: {
    enabled: true,
    endpoint: "/api/chat",
    model: "gpt-5-mini",
    useFromStage: 1,
    fallbackToLocal: true
  }
};
