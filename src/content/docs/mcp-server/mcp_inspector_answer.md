---
title: MCP Inspector로 확인할 수 있는 것들
description: MCP Inspector에서 connection 확인 외에 tools, resources, prompts, logs, CLI 테스트까지 어디까지 볼 수 있는지 정리합니다.
---
![GPT 5.4 Thinking](https://img.shields.io/badge/ChatGPT-5.4Thinking-00A67E?logo=openaigym&logoColor=white)

`MCP Inspector`는 단순히 **connection 확인**만 하는 도구가 아니라, 사실상 **MCP 서버용 Postman + 디버거**에 가깝습니다.

```bash title="shell"
npx -y @modelcontextprotocol/inspector@latest
```

공식 문서 기준으로 주요 기능은 아래와 같습니다.

## 주요 기능

- **Tools 테스트**: 서버가 노출한 tool 목록 보기, schema 확인, 직접 인자 넣어서 실행, 결과 확인 가능  
  참고: [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector)
- **Resources 탐색**: 리소스 목록, MIME 타입, 설명, 실제 내용 확인, subscription 테스트 지원  
  참고: [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector)
- **Prompts 테스트**: prompt template 목록, 인자, 설명을 보고 원하는 값으로 실행해서 생성되는 메시지 미리보기 가능  
  참고: [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector)
- **로그/알림 확인**: 서버가 보내는 로그와 notification을 Inspector에서 볼 수 있어서 에러 원인 추적에 유용  
  참고: [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector)
- **전송 방식/실행 옵션 조정**: transport 선택, 로컬 서버 실행 커맨드, 인자, 환경변수까지 바꿔가며 테스트 가능  
  참고: [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector)

## CLI 모드도 지원

Inspector는 UI 모드만 있는 게 아니라 **CLI 모드**도 있습니다.

CLI 모드는 스크립트, 자동화, CI, 코딩 에이전트 연동에 적합하고, `tools/list`, `tools/call`, `resources/list`, `prompts/list` 같은 작업을 터미널에서 바로 실행할 수 있습니다.

참고:
- [GitHub - modelcontextprotocol/inspector](https://github.com/modelcontextprotocol/inspector)

### 예시

```bash title="shell"
# tool 목록 보기
npx @modelcontextprotocol/inspector --cli node build/index.js --method tools/list

# 특정 tool 호출
npx @modelcontextprotocol/inspector --cli node build/index.js \
  --method tools/call \
  --tool-name mytool \
  --tool-arg key=value

# resource 목록 보기
npx @modelcontextprotocol/inspector --cli node build/index.js --method resources/list

# prompt 목록 보기
npx @modelcontextprotocol/inspector --cli node build/index.js --method prompts/list
```

## 실무에서는 어떻게 쓰나

보통은 이런 흐름으로 확인합니다.

1. **Connect 성공 확인**
2. **tools/list**로 노출 확인
3. **tools/call**로 실제 인자 테스트
4. **notifications/logs** 보면서 에러 수정
5. 필요하면 **resources/prompts**까지 점검

공식 문서도 이런 식의 반복 테스트와 에러 핸들링 검증을 권장합니다.

## 지금 관점에서 보면

MCP 서버를 만들고 있는 흐름이라면, 다음으로 해볼 만한 건 **Inspector에서 `tools/list` / `tools/call` / `resources/list`를 직접 쳐보는 것**입니다.

그럼 단순히 “연결됨” 수준이 아니라, **실제로 host가 쓸 수 있는 상태인지**까지 바로 확인할 수 있습니다.
