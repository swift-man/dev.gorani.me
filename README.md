# dev.gorani.me

Astro + Starlight 기반 정적 블로그입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
npm run preview
```

## 콘텐츠 작성

- 홈: `src/content/docs/index.md`
- 글: `src/content/docs/**/*.md`
- 카테고리 폴더 예시: `src/content/docs/python/`, `src/content/docs/mongodb/`

## GitHub Pages 배포

1. 저장소를 GitHub에 푸시
2. GitHub 저장소 설정 > Pages > Source를 `GitHub Actions`로 선택
3. `main` 브랜치 푸시 시 `.github/workflows/deploy.yml`로 자동 배포
4. 커스텀 도메인: `https://dev.gorani.me/`

## 글쓰기 기능 (GitHub 로그인 + Markdown)

1. `/write` 페이지 접속
2. GitHub 로그인
3. 현재 카테고리에 Markdown 문서 작성 후 저장

카테고리 문서 페이지에서는 `이 카테고리에 글쓰기` 링크가 자동 표시됩니다.

### 프론트 환경변수

- `PUBLIC_WRITE_API_BASE` (Workers API 주소)

예: `https://dev-gorani-write-api.workers.dev`

### 백엔드 (Cloudflare Worker)

- 설정/배포 가이드: `/Users/kim_seung_jin/개발/dev.gorani.me/workers/write-api/README.md`

## 댓글/분석 설정

1. `.env.example`을 참고해 `.env`를 생성
2. Plausible:
   - `PUBLIC_PLAUSIBLE_DOMAIN=dev.gorani.me`
3. Giscus:
   - `PUBLIC_GISCUS_REPO` (`owner/repo`)
   - `PUBLIC_GISCUS_REPO_ID`
   - `PUBLIC_GISCUS_CATEGORY_ID`
4. GitHub Actions 사용 시 저장소 `Settings > Secrets and variables > Actions > Variables`에 `PUBLIC_*` 값 추가

`PUBLIC_GISCUS_REPO_ID`와 `PUBLIC_GISCUS_CATEGORY_ID`가 비어 있으면 댓글 위젯은 자동으로 비활성화됩니다.
최소 필수값: `PUBLIC_GISCUS_REPO`, `PUBLIC_GISCUS_REPO_ID`, `PUBLIC_GISCUS_CATEGORY_ID`.
