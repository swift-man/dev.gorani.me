---
title: Astro 로컬에 올려서 실행하기
description: 가능합니다. 바로 로컬 실행 명령 확인해서 테스트용으로 가장 빠른 실행 방법을 정리해드리겠습니다.
---
![GPT 5.3-Codex](https://img.shields.io/badge/GPTCodex-5.3-00A67E?logo=openaigym&logoColor=white)

가능합니다. 바로 로컬 실행 명령 확인해서 테스트용으로 가장 빠른 실행 방법을 정리해드리겠습니다.
```ts title="bash"
$ ASTRO_TELEMETRY_DISABLED=1 npm run dev -- --host 127.0.0.1 --port 4321


> bot-gorani-me@1.0.0-beta.52 dev
> astro dev --host 127.0.0.1 --port 4321

06:34:24 [astrowind] Astrowind `./src/config.yaml` has been loaded.
06:34:24 [types] Generated 1ms
06:34:25 [content] Syncing content
06:34:25 [content] Astro config changed
06:34:25 [content] Clearing content store
06:34:25 [content] Synced content

 astro  v5.12.9 ready in 1189 ms

┃ Local    http://127.0.0.1:4321/

06:34:25 watching for file changes...

 update  ▶ New version of Astro available: 5.17.3
  Run npx @astrojs/upgrade to update

^C
```

## 가능합니다. 로컬 테스트 정상 동작 확인했습니다.  
실행 명령:
```ts title="bash"
ASTRO_TELEMETRY_DISABLED=1 npm run dev -- --host 127.0.0.1 --port 4321
```

or

```ts title="bash"
npm run dev
```
접속:

* http://127.0.0.1:4321/

## 두 명령어 차이

차이는 옵션 3개입니다.

* ASTRO_TELEMETRY_DISABLED=1  
  * Astro 텔레메트리(익명 사용 통계) 비활성화
* --host 127.0.0.1
  * 로컬 루프백 주소에만 바인딩 (localhost에서만 접속)
* --port 4321
  * 포트를 4321로 고정
  
즉 npm run dev는 기본값으로 실행,  
긴 명령은 “텔레메트리 끄고 + 호스트/포트 명시” 실행입니다.

## package-lock.json 파일이 생긴 이유
정상입니다. `npm install` 하면 자동 생성됩니다.

의미:

* 의존성 버전을 고정해서
* 로컬/CI/배포 환경에서 같은 버전으로 설치되게 해줍니다.

권장:

`package-lock.json`은 커밋하는 게 맞습니다.  
원하면 다음으로 CI도 `npm install`에서 `npm ci`로 다시 바꿔서 더 안정적으로 맞춰드릴게요.

## 캐시 삭제 명령어
```ts title="bash"
rm -rf .astro
```
