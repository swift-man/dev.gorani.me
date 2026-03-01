# write-api (Cloudflare Workers)

GitHub OAuth + 문서 커밋 API.

## 준비

1. Cloudflare Workers 배포
2. GitHub OAuth App 생성
   - Authorization callback URL: `https://<worker-subdomain>.workers.dev/auth/github/callback`

## wrangler secret

```bash
cd workers/write-api
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
npx wrangler secret put API_BASE
```

`API_BASE` 예: `https://dev-gorani-write-api.workers.dev`

## wrangler vars

`wrangler.toml`의 기본값 확인:

- `ALLOWED_ORIGIN=https://dev.gorani.me`
- `GITHUB_OWNER=swift-man`
- `GITHUB_REPO=dev.gorani.me`
- `DEFAULT_BRANCH=main`

## 배포

```bash
cd workers/write-api
npx wrangler deploy
```
