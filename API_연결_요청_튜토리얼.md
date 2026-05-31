# API 연결 요청 튜토리얼 (초보자용)

현재 웹앱은 API 설정 UI를 숨긴 상태입니다.  
Vercel 배포 시에는 서버리스 API(`/api/chat`)가 Vercel 환경변수 `OPENAI_API_KEY`를 사용합니다.

## 1. 왜 이렇게 하나요?
- 공개 웹앱에서 API Key를 직접 입력/저장하면 노출 위험이 큽니다.
- 안전한 방식은 서버 프록시에 키를 Secret으로 보관하고, 웹앱은 프록시만 호출하는 구조입니다.

## 2. 준비물
1. Vercel 프로젝트
2. Vercel 환경변수 `OPENAI_API_KEY`
3. 필요 시 모델 변경용 환경변수 `OPENAI_MODEL`

## 3. Codex에게 요청하는 방법
아래 템플릿 그대로 보내면 됩니다.

```text
중등용 웹앱을 Vercel API 방식으로 점검해줘.
- Vercel URL: https://<project>.vercel.app/
- 요구사항:
  1) API 실패 시 로컬 시뮬레이션 fallback
  2) 2~3단계 가이드 적용 모드에서만 API 호출
  3) 오류 메시지는 학생용으로 짧게 표시
```

## 4. 작업 후 확인 항목
1. 취약 챗봇 모드: 기존처럼 로컬 응답 동작
2. 가이드 적용 모드: Vercel API 응답 동작
3. API 오류/환경변수 누락 시: 앱이 멈추지 않고 fallback 동작
4. 저장소 내 API Key 문자열이 없는지 확인

## 5. 실패 시 점검 순서
1. Vercel 환경변수 `OPENAI_API_KEY` 등록 여부 확인
2. 배포 후 재빌드/재배포 여부 확인
3. 서버 Secret(`OPENAI_API_KEY`) 재등록
4. 배포 로그에서 401/403/429 확인
