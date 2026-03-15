---
title: MCP SSE 방식과 HTTP 방식의 차이
description: MCP에서 구형 SSE transport와 현재 Streamable HTTP transport가 어떻게 다른지 정리합니다.
---
![GPT 5.4 Thinking](https://img.shields.io/badge/ChatGPT-5.4Thinking-00A67E?logo=openaigym&logoColor=white)

요즘 MCP에서 말하는 기준으로는, **“SSE 방식”은 레거시(구형) transport**이고, **“HTTP 방식”은 `Streamable HTTP`**를 뜻하는 경우가 많습니다.

공식 스펙 기준으로 현재 표준 transport는 `stdio`와 `Streamable HTTP`이고, `Streamable HTTP`가 **예전의 HTTP+SSE transport를 대체**했습니다.

## 가장 간단한 차이

### 구형 SSE 방식

- 서버가 **SSE 전용 endpoint** 하나를 열고, 클라이언트는 거기에 **GET으로 길게 연결**해 서버 메시지를 받습니다.
- 클라이언트가 서버로 보내는 메시지는 **별도의 HTTP POST endpoint**로 보냅니다.
- 즉, **받는 통로와 보내는 통로가 분리**돼 있습니다.
- 서버는 연결 직후 `endpoint` 이벤트를 먼저 보내서, 클라이언트가 이후 POST를 어디로 보낼지 알려줘야 합니다.

### 현재 Streamable HTTP 방식

- 서버가 **하나의 MCP endpoint**를 두고, 그 endpoint가 **GET과 POST를 모두 지원**합니다.
- 클라이언트는 보통 **POST로 요청**을 보냅니다.
- 서버는 상황에 따라 **일반 HTTP 응답(JSON)** 으로 끝낼 수도 있습니다.
- 필요하면 **같은 HTTP 흐름에서 SSE를 사용해 스트리밍**할 수도 있습니다.
- 즉, **SSE가 transport 자체가 아니라, HTTP transport 안의 선택적 스트리밍 방식**으로 들어간 셈입니다.

## 실무적으로 보면

- **SSE 방식**은 구조가 단순하지만, endpoint가 둘로 나뉘고 레거시 호환을 더 신경 써야 합니다.
- 공식 문서도 이 방식은 **2024-11-05 프로토콜의 구 transport**로 남아 있고, 최신 스펙에서는 대체 대상으로 설명합니다.
- **Streamable HTTP 방식**은 원격 서버용으로 더 현대적입니다.
- 공식 아키텍처 문서도 이 transport가 **원격 MCP 서버 통신**에 쓰이고, **Bearer token, API key, custom header 같은 표준 HTTP 인증 방식**을 지원한다고 설명합니다.

## 세션 관리 차이

또 하나 큰 차이는 **세션 관리**입니다.

`Streamable HTTP`는 초기화 응답에서 `Mcp-Session-Id`를 줄 수 있고, 이후 요청마다 그 세션 ID를 헤더로 보내는 식으로 **세션 생성·유지·종료(DELETE)** 까지 정의돼 있습니다.

구형 SSE 문서에는 이런 현재식 세션 흐름이 중심으로 정리돼 있지 않습니다.

## 정리하면

- **새로 만들 거면**: `Streamable HTTP`
- **옛 클라이언트까지 붙여야 하면**: `SSE + Streamable HTTP` 둘 다 지원
- **HTTP 방식 안에서도 스트리밍이 필요하면**: `Streamable HTTP`에서 SSE를 옵션으로 사용

공식 스펙도 구형 서버 호환을 위해 **옛 SSE/POST endpoint를 함께 유지**하는 전략을 안내합니다.

## 한 줄 요약

**예전 SSE 방식은 GET으로 받기 + 별도 POST로 보내기였고, 지금 HTTP 방식은 하나의 MCP HTTP endpoint에서 POST 중심으로 처리하면서 필요할 때만 SSE로 스트리밍하는 방식입니다.**

## 참고 링크

- [MCP Specification (2025-03-26) - Basic Transports](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports)
- [MCP Specification (2024-11-05) - Basic Transports](https://modelcontextprotocol.io/specification/2024-11-05/basic/transports)
- [MCP Architecture](https://modelcontextprotocol.io/docs/learn/architecture)
