---
title: Redroid 재구동
description: 기존 컨테이너가 정상 동작하면 굳이 재설치 안 해도 된다.
---
![GPT 5.4 Thinking](https://img.shields.io/badge/ChatGPT-5.4Thinking-00A67E?logo=openaigym&logoColor=white)

## 지금 바로 확인할 것

기존 컨테이너 상태부터 봐.
```bash title="shell"
docker ps -a --filter name=redroid
```

상태가 보통 이렇게 나뉜다.
•	Up ... 이면 이미 실행 중  
•	Exited ... 이면 만들어져 있는데 꺼져 있음  
•	아예 이상하면 로그 확인 필요

### 1) 기존 redroid를 그냥 쓰면 되는 경우

컨테이너가 이미 있으면 그냥 시작하면 된다.

```bash title="shell"
docker start redroid
```

로그도 한번 보는 게 좋다.

```bash title="shell"
docker logs redroid --tail 100
```

### 2) 기존 게 꼬였고 새로 다시 설치하고 싶은 경우

기존 컨테이너를 지우고 다시 설치해야 한다.
```bash title="shell"
docker rm -f redroid
```
그 다음 다시:
```bash title="shell"
/iris_control install_redroid
```
주의할 점은, 기존 redroid 안에 따로 보관하던 데이터가 있으면 날아갈 수 있다는 거야.
그래서 불안하면 먼저 이름만 바꿔두는 방법도 있다.

### 3) 기존 건 살리고 새 컨테이너를 또 만들고 싶은 경우

스크립트 안에서 --name redroid 로 고정돼 있을 가능성이 높아.
그럼 이름을 바꿔야 해.

예:
```bash title="shell"
docker run --name redroid2 ...
```

## 추천 순서

가장 안전한 순서는 이거야.
```bash title="shell"
docker ps -a --filter name=redroid
docker logs redroid --tail 100
docker start redroid
```
이걸로 기존 컨테이너가 정상 동작하면 굳이 재설치 안 해도 된다.

## 한 줄 결론

지금은 설치 실패 + 기존 컨테이너 이름 충돌 상태야.
보통은 docker start redroid 해보면 끝난다.
안 되면 docker rm -f redroid 후 재설치하면 된다.