---
title: macOS 에서 Homebrew 설치
description: brew가 아직 설치 안 되었거나, 설치는 되었는데 PATH에 안 잡힌 상태예요.
---
![GPT 5.4 Thinking](https://img.shields.io/badge/ChatGPT-5.4Thinking-00A67E?logo=openaigym&logoColor=white)
```ts title="bash"
zsh: command not found: brew
```
brew가 아직 설치 안 되었거나, 설치는 되었는데 PATH에 안 잡힌 상태예요.

맥에서 바로 이렇게 하세요.

### 1) Homebrew 설치
```ts title="bash"
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
설치 끝나면 터미널에 안내가 나오는데, 보통 zsh에서는 아래 PATH 설정을 추가해야 합니다.

### 2) PATH 등록

Apple Silicon(M1/M2/M3/M4)
```ts title="bash"
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```
Intel Mac
```ts title="bash"
echo 'eval "$(/usr/local/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/usr/local/bin/brew shellenv)"
```
### 3) 설치 확인
```ts title="bash"
brew --version
```
정상이라면 버전이 나옵니다.

---

### 이미 brew를 설치했는데도 안 될 때

아래 둘 중 하나에 brew가 있는지 확인해보세요.
```ts title="bash"
ls /opt/homebrew/bin/brew
ls /usr/local/bin/brew
```
파일이 보이면 설치는 된 거고, PATH만 안 잡힌 겁니다.
그 경우 위의 brew shellenv 부분만 실행하면 됩니다.
