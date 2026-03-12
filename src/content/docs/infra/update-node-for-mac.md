---
title: Node.js macOS 에서 업데이트하기
description: workflow_dispatch
---
![GPT 5.3-Codex](https://img.shields.io/badge/GPTCodex-5.3-00A67E?logo=openaigym&logoColor=white)


which node
brew list --versions node node@20
node -v

판정:

which node가 /opt/homebrew/bin/node(Apple Silicon) 또는 /usr/local/bin/node면 brew 설치/사용 가능성이 큽니다.
brew list --versions node에 버전이 나오면 brew로 설치된 게 맞습니다.
which node가 ~/.nvm/...나 ~/.fnm/...면 현재는 brew가 아니라 버전 매니저 경로를 쓰는 중입니다.

sudo mkdir -p ~/.local/state/fnm_multishells
sudo chown -R "$(id -un)":"$(id -gn)" ~/.local

소유권 복구:
chmod u+rwx ~/.local ~/.local/state ~/.local/state/fnm_multishells
source ~/.zshrc
확인:

그 다음 Node 버전 전환:

fnm --version
fnm install 20.20.0
fnm use 20.20.0
node -v
그다음 앱:

cd /Users/kim_seung_jin/개발/gorani.me/react-native
npm install
npx expo start --clear


아니요. fnm은 Node 자체가 아니라 Node 버전 관리자입니다.

Node: 실제 실행 엔진 (node, npm)
fnm: Node 버전을 설치/전환하는 도구
즉 fnm으로 20.20.0 같은 버전을 설치하고, 실제로는 node를 쓰는 구조예요.

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
