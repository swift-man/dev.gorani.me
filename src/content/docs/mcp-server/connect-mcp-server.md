---
title: OpenClaw에서 로컬 MCP 서버 연결하기
description: DNS 조회 결과를 얼마 동안 캐시에 저장해 둘지 정하는 시간
---
![OEPNCLAW](https://img.shields.io/badge/OpenClaw-2026.3.8-00A67E)

이 문서는 OpenClaw 환경에서 로컬 MCP 서버를 `mcporter`로 등록하고, 연결 상태를 확인하고, 실제로 질의하는 과정을 정리한 문서다.

> 참고: 메모리 검색도 확인해봤지만 관련 저장된 메모는 없어서, 아래 내용은 이번 연결 과정에서 확인한 흐름 기준으로 정리했다.

---

## 1. 핵심 개념

### OpenClaw와 MCP
- **OpenClaw**는 대화형 에이전트 런타임이다.
- **MCP(Model Context Protocol)** 는 외부 도구/지식 저장소/리소스를 에이전트가 사용할 수 있게 연결하는 프로토콜이다.
- MCP 서버를 등록했다고 해서 에이전트가 **자동으로 매 턴 참고하는 것은 아니다**.
- 등록 후에도 실제로는:
1. 서버가 정상 연결되어야 하고
2. tools/resources/prompts 가 노출되어야 하고
3. 필요할 때 실제 호출되어야 한다.

---

## 2. 이번에 확인한 포인트

초기에는 다음 URL을 후보로 봤다.

- `http://127.0.0.1:8010/lookup`
- `http://127.0.0.1:8010/mcp`
- `http://127.0.0.1:8000/mcp`

결론적으로 가장 유력했던 실제 MCP 엔드포인트는:

```text
http://127.0.0.1:8000/mcp
```

---

## 3. mcporter로 MCP 서버 등록하기

### 서버 등록
```ts title="bash"
mcporter config add mylookup http://127.0.0.1:8000/mcp
```

### 등록 제거
```ts title="bash"
mcporter config remove mylookup
```

### 등록 목록 확인
```ts title="bash"
mcporter config list
```

### 특정 서버 설정 확인
```ts title="bash"
mcporter config get mylookup --json
```

---

## 4. config 경로 주의점

이번에 실제 등록된 경로는 아래였다.

```ts title="text"
/Users/mini4default/.openclaw/config/mcporter.json
```

즉, `mcporter`를 실행할 때 현재 작업 디렉터리/프로젝트 기준 config와
OpenClaw 쪽 config가 다르게 잡힐 수 있다.

그래서 서버가 등록되어 있는데도 이런 에러가 날 수 있다.

```ts title="text"
Unknown MCP server 'mylookup'
```

이럴 땐 config 경로를 명시해서 실행하는 게 가장 확실하다.

```ts title="bash"
mcporter --config /Users/mini4default/.openclaw/config/mcporter.json config list
```

---

## 5. 서버 연결 확인 방법

### 5.1 스키마/툴 목록 보기
```ts title="bash"
mcporter --config /Users/mini4default/.openclaw/config/mcporter.json list mylookup --schema
```

이번에 확인된 tool은 다음과 같았다.

```ts title="text"
query_notes(query: string)
```

설명:
- 로컬 지식 저장소에서 질의한다.

---

## 6. 직접 MCP tool 호출하기

### 예시 1: 핑다 조회
```ts title="bash"
mcporter --config /Users/mini4default/.openclaw/config/mcporter.json \
call mylookup.query_notes query='핑다가뭐야' --output json
```

결과:
```ts title="json"
{
"answer": "핑크다이어리 iOS 프로젝트의 줄임말로 사용 중.",
"matched": "핑다"
}
```

### 예시 2: 빨리해서생긴일 조회
```ts title="bash"
mcporter --config /Users/mini4default/.openclaw/config/mcporter.json \
call mylookup.query_notes query='빨리해서생긴일' --output json
```

결과:
```ts title="json"
{
"answer": "방장",
"matched": "빨리해서생긴일"
}
```

### 예시 3: 토깽이 조회
```ts title="bash"
mcporter --config /Users/mini4default/.openclaw/config/mcporter.json \
call mylookup.query_notes query='토깽이' --output json
```

결과:
```ts title="json"
{
"answer": "내 카카오톡 봇",
"matched": "토깽이"
}
```

---

## 7. 왜 등록했는데 바로 답변에 반영되지 않을까?

MCP 서버를 등록했다고 해서 에이전트가 자동으로 매번 참고하진 않는다.

즉:

- **등록** = 사용 가능한 서버 목록에 추가
- **참조** = 실제로 해당 tool/resource를 호출함

그래서 에이전트가 기본 지식으로 먼저 답해버릴 수도 있다.

예를 들어 아래 요청처럼 명시해야 실제 MCP를 먼저 타게 만들 수 있다.

```ts title="text"
mylookup.query_notes를 먼저 사용해서 "핑다가 뭐야"를 답해
```

---

## 8. SSE 관련 에러 해석

초기 테스트 중 이런 에러를 확인했다.

```ts title="json"
{"jsonrpc":"2.0","id":"server-error","error":{"code":-32600,"message":"Not Acceptable: Client must accept text/event-stream"}}
```

이 메시지는 보통 다음 뜻이다.

- 서버는 죽은 게 아님
- 해당 엔드포인트는 **SSE(text/event-stream)** 기반 응답을 기대함
- 즉, 일반 HTTP 요청이 아니라 **SSE를 수용하는 클라이언트**로 붙어야 함

---

## 9. curl로 SSE 확인하기

아래 명령으로 엔드포인트가 실제로 SSE를 여는지 확인할 수 있다.

```ts title="bash"
curl -i \
-H "Accept: text/event-stream" \
http://127.0.0.1:8000/mcp
```

정상일 경우 이런 식의 응답이 나온다.

```ts title="http"
HTTP/1.1 200 OK
content-type: text/event-stream
...
: ping - 2026-03-12 11:44:05.386136+00:00
```

이건 좋은 신호다.

의미:
- 서버가 살아 있음
- SSE 스트림이 열림
- `/mcp` 엔드포인트가 실제 MCP/SSE 엔드포인트일 가능성이 높음

---

## 10. 자주 만나는 문제와 해석

### 10.1 `Unknown MCP server 'mylookup'`
원인:
- 등록이 안 됐거나
- 다른 config 파일을 보고 있거나
- project/home config scope가 다름

해결:
```ts title="bash"
mcporter config list
mcporter --config /Users/mini4default/.openclaw/config/mcporter.json config list
```

---

### 10.2 `405`
예:
```ts title="text"
SSE error: Non-200 status code (405)
```

의미:
- URL은 살아 있을 수 있음
- 하지만 메서드나 transport가 맞지 않음
- `/lookup` 같은 경로가 MCP 엔드포인트가 아닐 가능성도 있음

---

### 10.3 `404`
의미:
- 경로가 틀렸을 가능성이 큼

---

### 10.4 `401` / `403`
의미:
- 인증 필요 가능성

---

### 10.5 검색 결과가 이상하게 매칭됨
예:
- 질문: `토깽이가 뭐야`
- 결과: 엉뚱한 항목 매칭

원인:
- 부분 일치
- 유사도 검색
- 자연어 질의가 정확한 키와 다름

대응:
- 더 짧고 정확한 키워드로 질의
- 예: `토깽이`
- exact match 옵션이 있으면 사용
- score / 후보 리스트를 같이 반환하도록 MCP 서버 개선

---

## 11. 실전 명령어 모음

### 등록
```ts title="bash"
mcporter config add mylookup http://127.0.0.1:8000/mcp
```

### 제거
```ts title="bash"
mcporter config remove mylookup
```

### 목록 확인
```ts title="bash"
mcporter config list
```

### 설정 경로 명시해서 목록 확인
```ts title="bash"
mcporter --config /Users/mini4default/.openclaw/config/mcporter.json config list
```

### 서버 스키마 확인
```ts title="bash"
mcporter --config /Users/mini4default/.openclaw/config/mcporter.json list mylookup --schema
```

### MCP 호출
```ts title="bash"
mcporter --config /Users/mini4default/.openclaw/config/mcporter.json \
call mylookup.query_notes query='핑다가뭐야' --output json
```

### SSE 엔드포인트 확인
```ts title="bash"
curl -i \
-H "Accept: text/event-stream" \
http://127.0.0.1:8000/mcp
```

---

## 12. 한 줄 요약

이번 연결 과정에서 얻은 핵심은 이렇다.

- 실제 MCP 엔드포인트 후보는 `http://127.0.0.1:8000/mcp`
- 이 엔드포인트는 `text/event-stream` 을 요구하는 SSE 기반 응답을 한다
- `mcporter` 등록과 실제 사용은 별개다
- config 경로가 다르면 등록한 서버가 안 보일 수 있다
- 가장 안전한 방식은 `--config /Users/mini4default/.openclaw/config/mcporter.json` 를 명시해서 호출하는 것이다
