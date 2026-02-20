---
title: 코드 블록 스타일 가이드
description: 파일명, 라인 강조, diff 스타일 사용법
---
![GPT 5.3-Codex](https://img.shields.io/badge/GPTCodex-5.3-00A67E?logo=openaigym&logoColor=white)

## 코드 블록 스타일

아래 문법으로 파일명, 라인 강조, diff 스타일을 쓸 수 있습니다.

### 파일명 + 라인 강조

````md
```ts title="src/server.ts" {2,5}
import express from 'express';
const app = express();
app.get('/health', (_req, res) => res.send('ok'));
app.listen(3000);
```
````

```ts title="src/server.ts" {2,5}
import express from 'express';
const app = express();
app.get('/health', (_req, res) => res.send('ok'));
app.listen(3000);
```

### Diff 스타일

````md
```diff title="deploy.diff"
- npm ci
+ npm install --no-audit --no-fund
```
````

```diff title="deploy.diff"
- npm ci
+ npm install --no-audit --no-fund
```
