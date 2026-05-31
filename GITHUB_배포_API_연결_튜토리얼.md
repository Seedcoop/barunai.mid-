# GitHub 배포 + API 연동 운영 가이드

이 문서는 현재 `중등용` 웹앱을 GitHub Pages로 게시하는 기존 기준을 설명합니다.  
OpenAI API를 함께 사용할 때는 현재 코드 기준으로 **Vercel 배포 + `/api/chat` 서버리스 함수**를 권장합니다.

## 0. 현재 앱 구조 요약
- 화면 탭: `Q&A 실습`, `윤리 가이드 문서`
- 접속 게이트: `0단계 비밀 코드`
- API 설정 UI: **의도적으로 숨김(비노출)**
- 기본 실행: 1단계 로컬 시뮬레이션, 2~3단계 Vercel API 시도 후 실패 시 로컬 fallback

## 1. GitHub Pages 게시

### 방법 A: GitHub 웹 업로드
1. 새 Public 저장소 생성
2. `중등용` 폴더 파일을 저장소 루트에 업로드
3. `Settings > Pages` 이동
4. `Source: Deploy from a branch` 선택
5. Branch `main`, Folder `/(root)` 저장
6. 1~3분 후 발급 URL 접속

### 방법 B: Git 명령 업로드
```powershell
git init
git add .
git commit -m "Deploy middle-school ethics app"
git branch -M main
git remote add origin https://github.com/<계정명>/<저장소명>.git
git push -u origin main
```

## 2. 0단계 비밀 코드 변경

파일:
- [gate-config.js](C:/Users/sodaj/Desktop/교뵤%20웹앱/중등용/gate-config.js)

바꾸는 항목:
- `secretCode`
- `persistHours`

예시:
```js
window.BARUNAI_APP_CONFIG = {
  gate: {
    enabled: true,
    secretCode: "SDCP05",
    persistHours: 12,
    storageKey: "barunai_gate_unlocked_until"
  }
};
```

## 3. API 연동 방식 (현재 권장: Vercel)

현재 UI에서는 API 입력창을 숨겼기 때문에, API 연동은 다음 흐름으로 진행합니다.
1. `중등용` 폴더를 Vercel 프로젝트 루트로 배포
2. Vercel 환경변수 `OPENAI_API_KEY` 등록
3. 2~3단계 가이드 적용 모드에서 `/api/chat` 호출 확인
4. API 실패 시 기존 로컬 시뮬레이션 fallback 확인

Vercel API 파일:
- [api/chat.js](./api/chat.js)
- [api/_openai.js](./api/_openai.js)

Cloudflare Worker 템플릿은 참고용으로만 유지합니다.

## 4. 내가 Codex에게 API 연동 요청할 때 보내면 좋은 정보
1. Vercel 배포 URL
2. Vercel 환경변수 등록 여부
3. 수업 운영 요구사항
- 호출 실패 시 fallback 로직
- 호출 제한/로그 정책

요청 템플릿:
```text
중등용 웹앱 Vercel API를 점검해줘.
- Vercel URL: https://<project>.vercel.app/
- 요구사항: 실패 시 로컬 시뮬레이션으로 자동 전환
```

## 5. 보안 원칙
1. API Key를 브라우저 코드/저장소에 넣지 않기
2. 서버 Secret에만 저장
3. CORS를 실제 배포 도메인으로 제한

## 6. 참고 공식 문서
- GitHub Pages 배포 소스 설정: [GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site?s=09)
- OpenAI API 키 보안 원칙: [OpenAI API Authentication](https://platform.openai.com/docs/api-reference/authentication?api-mode=responses)
- Cloudflare Worker Secret 관리: [Cloudflare Workers Secrets](https://developers.cloudflare.com/workers/configuration/secrets/)
