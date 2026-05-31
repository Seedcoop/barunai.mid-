/**
 * 수업 운영용 설정 파일
 * - 비밀 코드 변경: gate.secretCode 값만 바꾸면 됩니다.
 * - GitHub 공개 배포 시 API Key는 이 파일에 넣지 마세요.
 */
window.BARUNAI_APP_CONFIG = {
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
    useFromStage: 1,
    fallbackToLocal: true
  }
};
