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

- 홈: `src/content/docs/index.mdx`
- 글: `src/content/docs/blog/*.mdx`

## GitHub Pages 배포

1. 저장소를 GitHub에 푸시
2. GitHub 저장소 설정 > Pages > Source를 `GitHub Actions`로 선택
3. `main` 브랜치 푸시 시 `.github/workflows/deploy.yml`로 자동 배포
4. 저장소 Pages Custom domain에 `dev.gorani.me` 설정

`public/CNAME` 파일에 커스텀 도메인이 포함되어 있어 배포 시 유지됩니다.

## DNS 권장 설정

- `dev.gorani.me`를 GitHub Pages 대상(`YOUR_GITHUB_ID.github.io`)으로 `CNAME` 연결
