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
- 글: `src/content/docs/blog/*.md`

## GitHub Pages 배포

1. 저장소를 GitHub에 푸시
2. GitHub 저장소 설정 > Pages > Source를 `GitHub Actions`로 선택
3. `main` 브랜치 푸시 시 `.github/workflows/deploy.yml`로 자동 배포
4. 배포 URL: `https://swift-man.github.io/dev.gorani.me/`
