---
title: MCP Inspector
description: MCP Inspector는 MCP 서버 디버깅/테스트 도구
---
![OEPNCLAW](https://img.shields.io/badge/OpenClaw-2026.3.8-00A67E)

MCP Inspector는 **MCP 서버 디버깅/테스트 도구**야.

쉽게 말하면:
- 네 MCP 서버에 붙어서
- 어떤 **tools / resources / prompts** 가 있는지 보고
- 직접 호출도 해보고
- 연결이 왜 안 되는지 확인하는 **개발자용 검사기**라고 보면 돼.

### 언제 쓰냐
이럴 때 유용해:
- “내 서버가 진짜 MCP로 열렸나?”
- “엔드포인트 URL이 맞나?”
- “왜 클라이언트가 tools를 못 읽지?”
- “인증 문제인가, transport 문제인가?”
- “tool schema가 이상한가?”

### 네 상황 기준으로 보면
지금 `mcporter`에서
- 등록은 됐는데
- `405` 뜨고
- tools discovery가 실패했잖아

이럴 때 Inspector 쓰면:
- 이 URL이 **진짜 MCP endpoint인지**
- **SSE / streamable HTTP / stdio** 중 뭐로 열려 있는지
- 응답 형식이 맞는지
더 분명하게 볼 수 있어.

### 역할 비교
- **mcporter**
  - 서버 등록하고
  - 목록 보고
  - 실제 tool 호출하는 쪽에 가까움

- **MCP Inspector**
  - 서버를 **검사/디버깅**하는 쪽에 더 가까움

### 한 줄 요약
**MCP Inspector = “내 MCP 서버가 제대로 동작하는지 들여다보는 테스트/디버깅 UI”**
