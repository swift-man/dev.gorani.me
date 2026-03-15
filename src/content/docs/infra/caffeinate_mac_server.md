---
title: Mac mini 잠자기 안 하게 서버용 헤드리스 터미널 설정
description: Mac mini 같은 macOS 서버에서 잠자기를 막기 위한 systemsetup과 caffeinate 설정을 정리합니다.
---
![GPT 5.4 Thinking](https://img.shields.io/badge/ChatGPT-5.4Thinking-00A67E?logo=openaigym&logoColor=white)

서버용이면 아래 설정부터 적용하면 됩니다.

## 서버용 기본 설정

```bash title="shell"
# 1) SSH 켜기
sudo systemsetup -setremotelogin on

# 2) 시스템 잠자기 끄기
sudo systemsetup -setsleep Off

# 3) 네트워크로 깨우기 켜기
sudo systemsetup -setwakeonnetworkaccess on

# 4) 정전 후 자동 재부팅 켜기
sudo systemsetup -setrestartpowerfailure on

# 5) 전원 복구 후 30초 뒤 부팅
sudo systemsetup -setWaitForStartupAfterPowerFailure 30
```

`systemsetup`은 macOS에 포함된 도구이고, `-setremotelogin`, `-setsleep`, `-setwakeonnetworkaccess`, `-setrestartpowerfailure`, `-setWaitForStartupAfterPowerFailure`를 지원합니다.

## `caffeinate` 같이 사용하기

헤드리스 맥미니라면 `caffeinate`도 같이 쓰는 게 안전합니다.

### 현재 세션에서만 잠자기 강제 방지

```bash title="shell"
caffeinate -d -i -m
```

### 터미널을 닫아도 유지하고 싶을 때

```bash title="shell"
nohup caffeinate -d -i -m >/tmp/caffeinate.log 2>&1 &
```

### 중지

```bash title="shell"
pkill caffeinate
```

### 특정 시간만 유지

예: 2시간

```bash title="shell"
caffeinate -t 7200
```

### 특정 프로세스가 끝날 때까지 유지

예:

```bash title="shell"
caffeinate -w $(pgrep -n python)
```

## 적용 확인

```bash title="shell"
sudo systemsetup -getremotelogin
sudo systemsetup -getsleep
pmset -g
ps -ef | grep caffeinate
```

서버용 추천 상태는 대략 이렇게 보이면 됩니다.

```text
autorestart 1
womp 1
sleep 0
displaysleep 0
disksleep 0
```

## 한 번에 실행

```bash title="shell"
sudo systemsetup -setremotelogin on && \
sudo systemsetup -setsleep Off && \
sudo systemsetup -setwakeonnetworkaccess on && \
sudo systemsetup -setrestartpowerfailure on && \
sudo systemsetup -setWaitForStartupAfterPowerFailure 30 && \
nohup caffeinate -d -i -m >/tmp/caffeinate.log 2>&1 &
```
