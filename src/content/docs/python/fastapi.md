---
title: Python FastAPI 가 뭐야?
description: FastAPI는 Python으로 만드는 초고속 웹 API 프레임워크입니다.
---
![ChatGPT 5.2](https://img.shields.io/badge/ChatGPT-5.2-00A67E?logo=openaigym&logoColor=white)

## FastAPI는 Python으로 만드는 초고속 웹 API 프레임워크입니다.

Flask보다 최신이고
Django보다 가볍고
성능은 Node.js급으로 빠른
👉 “백엔드 API 만들기 전용 엔진”

당신이 지금 하는 것들(봇 서버, AI API, 자동매매 서버 같은 것)에 딱 맞는 스택입니다.

## 🚀 왜 요즘 다 FastAPI 쓰냐

### 1️⃣ 압도적으로 빠름

Node.js 수준의 처리 속도

비결:
* 비동기 기반 (async/await)
* Starlette + Uvicorn

👉 AI API / 실시간 서비스에 최적

### 2️⃣ 코드가 미친 듯이 짧음

예시
```ts title="python"
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"hello": "world"}
```
끝입니다.

서버 실행:
```ts title="코드"
uvicorn main:app --reload
```

### 3️⃣ 자동으로 문서 생성됨 🤯

서버 켜면:
* /docs → Swagger UI
* /redoc → API 문서

프론트 / iOS 개발자 입장에서 개꿀

### 4️⃣ 타입 기반이라 안정성 높음
```ts title="python"
@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}
```
👉 타입 자동 검증

👉 잘못된 값 들어오면 자동 에러 처리

Swift 개발자인 당신에게 특히 잘 맞음 😆

## 🧠 어디에 쓰냐 (실전 예시)
당신 프로젝트 기준:

✅ LLM API 서버

Gemini / OpenAI / Grok 중계 서버

✅ 카카오톡 봇 백엔드

현재 Iris 서버 구조에 딱 맞음

✅ 주식 자동매매 엔진
* 신호 생성 API
* Redis 연결
* 실시간 데이터 처리

✅ 앱 백엔드

## 🆚 Flask vs FastAPI
| 항목 | Flask | FastAPI |
| :--- | :--- | :--- |
| **속도** | 보통 | 매우 빠름 |
| **비동기** | 불편 | 기본 지원 |
| **타입 안정성** | 없음 | 강력 |
| **자동 문서** | 없음 | 있음 |
| **AI 서버 적합성** | △ | ⭐⭐⭐⭐⭐ |

FastAPI는 최신 파이썬의 async/await와 타입 힌트를 적극 활용하여 성능과 개발 생산성(Swagger 자동 문서화 등) 면에서 우위를 점하고 있습니다.

Flask는 역사가 깊고 생태계가 넓어 단순한 웹 서비스 구현에는 여전히 유효하지만, 이미지에서 강조하듯 AI 모델 서빙이나 고성능 API 구축에는 FastAPI가 훨씬 더 선호되는 추세입니다.

## 📦 실제 구조 예시
```ts title="코드"
app/
 ├─ routers/
 ├─ services/
 ├─ domain/
 ├─ repository/
 └─ main.py
```
클린 아키텍처 그대로 가능 😆

## ⭐ 한 줄 정리
FastAPI = Python으로 만드는 “고성능 API 서버 프레임워크”
