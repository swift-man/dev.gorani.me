---
title: mac mini 헤드리스 세팅
description: Mac mini 같은 macOS 서버에서 잠자기를 막을 때 쓰는 caffeinate 명령을 정리합니다.
---
![GPT 5.4 Thinking](https://img.shields.io/badge/ChatGPT-5.4Thinking-00A67E?logo=openaigym&logoColor=white)

## macOS 서버에서 `caffeinate` 사용법

맥 터미널에서 **잠자기 방지**를 하려면 이 명령을 쓰면 됩니다.

```bash title="shell"
caffeinate -d -i -m
```

## 옵션 의미

- `-d`: 디스플레이 잠자기 방지
- `-i`: 시스템 idle sleep 방지
- `-m`: 디스크 잠자기 방지

### 서버용으로 가장 무난한 명령

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

### 실행 확인

```bash title="shell"
ps -ef | grep caffeinate
```

### 맥미니 서버용 추천

```bash title="shell"
nohup caffeinate -d -i -m >/tmp/caffeinate.log 2>&1 &
```
