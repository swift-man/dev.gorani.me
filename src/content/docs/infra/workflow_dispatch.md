---
title: GitgubAction workflow_dispatch 추가
description: workflow_dispatch
---
![GPT 5.3-Codex](https://img.shields.io/badge/GPTCodex-5.3-00A67E?logo=openaigym&logoColor=white)

```ts title="yml"
on:
  workflow_dispatch:
  push:
    branches: ["main"]
    paths:
      - "react-native/**"
      - "scripts/deploy-react-native-web.ps1"
      - ".github/workflows/deploy-react-native-web.yml"
```
