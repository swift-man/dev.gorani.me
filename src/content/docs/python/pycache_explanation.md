---
title: "Python `__pycache__` 설명"
description: "`__pycache__` 폴더가 왜 생기고, 지워도 되는지, Git에 올려야 하는지 정리합니다."
---
![GPT 5.4 Thinking](https://img.shields.io/badge/ChatGPT-5.4Thinking-00A67E?logo=openaigym&logoColor=white)

## `__pycache__`는 **파이썬이 만든 캐시 폴더**입니다.

파이썬 파일(`.py`)을 실행하면, 파이썬이 코드를 더 빨리 불러오려고 **바이트코드 파일**을 만들어 저장하는데, 그 파일이 보통 `__pycache__` 안에 들어갑니다.

### 예시

- 원본: `main.py`
- 캐시: `__pycache__/main.cpython-313.pyc`

## 왜 생기냐

- 다음 실행 때 조금 더 빠르게 로드하려고
- `import`할 때 매번 처음부터 다시 해석하지 않으려고

## 지워도 되냐

네, **지워도 됩니다.**

필요하면 파이썬이 다시 만듭니다.

## Git에 올려야 하냐

보통 **안 올립니다.**

`.gitignore`에는 보통 이렇게 넣습니다.

```txt title=".gitignore"
__pycache__/
*.pyc
```

## 비유하면

`__pycache__`는 파이썬의 **임시 빌드 결과물 폴더** 같은 느낌입니다.
