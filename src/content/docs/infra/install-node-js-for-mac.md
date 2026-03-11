---
title: macOS 에서 Node.js 설치
description: Windows 에서 이렇게 확인하면 됩니다.
---
![GPT 5.4 Thinking](https://img.shields.io/badge/GPTCodex-5.3-00A67E?logo=openaigym&logoColor=white)


## Node가 아직 설치되지 않은 상태입니다
```ts title="bash"
node -v
zsh: command not found: node
```

openclaw는 `Node 22` 이상이 필요하고, Homebrew로 설치한 node는 Apple Silicon Mac에서 기본적으로 `/opt/homebrew` 아래에 들어갑니다. Homebrew는 설치 전에 Xcode Command Line Tools도 요구합니다. [Github](https://github.com/openclaw/openclaw)

맥 미니 M4에서 가장 무난한 순서는 이겁니다.

```ts title="bash"
# 1) Xcode Command Line Tools 설치
xcode-select --install

# 2) Homebrew 설치
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 3) brew 경로 등록 (Apple Silicon)
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

# 4) Node 설치
brew install node

# 5) 확인
node -v
npm -v
brew -v
```

Homebrew 공식 설치 스크립트는 위 명령을 안내하고 있고, Apple Silicon에서는 기본 prefix가 /opt/homebrew입니다. 또한 brew install node가 공식 formula 설치 방법입니다.  ￼

설치가 끝나면 node -v가 떠야 합니다. 현재 Node 공식 다운로드 페이지에는 v24 LTS와 v22 LTS가 올라와 있어서, 지금 Homebrew로 설치되는 Node는 openclaw의 Node ≥22 조건을 충족합니다.  ￼

그다음은 이렇게 가면 됩니다.

```ts title="bash"
# Codex CLI 설치
npm i -g @openai/codex

# Codex 로그인
codex
```

Codex CLI는 npm으로 설치할 수 있고, 처음 실행하면 ChatGPT 계정 또는 API key로 로그인하라는 안내가 나옵니다.[OpenAI 개발자 센터](https://developers.openai.com/codex/cli/)  ￼

OpenClaw는 Node 준비 후 이렇게 설치하면 됩니다.
```ts title="bash"
# Codex CLI 설치
npm install -g openclaw@latest
openclaw onboard --install-daemon
```
OpenClaw 공식 저장소도 npm install -g openclaw@latest 와 openclaw onboard --install-daemon 를 권장 설치 경로로 안내합니다.  ￼

만약 brew도 안 뜨면, 먼저 아래 두 줄만 실행해보세요. [Github](https://github.com/openclaw/openclaw)

```ts title="bash"
xcode-select --install
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
