---
title: MongoDB 장/단점
description: 실시간 데이터 다루는 구조에서 많이 쓰는 NoSQL DB입니다.
---

![ChatGPT 5.2](https://img.shields.io/badge/ChatGPT-5.2-00A67E?logo=openaigym&logoColor=white)

## MongoDB

봇 / 로그 / AI 응답 저장 / 실시간 데이터
다루는 구조에서 많이 쓰는 NoSQL DB입니다.

## 🧠 MongoDB 한 줄 설명

JSON처럼 생긴 문서를 그대로 저장하는 데이터베이스

테이블 / 스키마 강제 없음
→ 구조 자주 바뀌는 서비스에 강함

## ✅ 장점

### 1️⃣ 스키마가 자유로움 (개발 속도 미침)

예:
```ts title="json"
{ name: "swiftman", age: 33 }
{ name: "iris", skills: ["AI", "trading"] }
```
같은 컬렉션에 저장 가능

👉 초기 서비스 개발 속도 매우 빠름
👉 요구사항 바뀌어도 DB 수정 거의 없음

### 2️⃣ JSON = 앱 개발자에게 직관적
Swift Codable 느낌 그대로

당신이 하는 구조:
  •  FastAPI
  •  Redis
  •  AI 응답

👉 전부 JSON 기반이라 궁합 좋음

### 3️⃣ 읽기 성능 좋음
문서 단위 조회

→ 채팅 로그
→ 봇 대화
→ 사용자 설정

같은 것에 최적

### 4️⃣ 수평 확장 쉬움 (샤딩)

데이터 많아지면

서버 여러 대로 자동 분산

→ 대규모 서비스에 유리

### 5️⃣ 캐시처럼 쓰기 가능

로그성 데이터 쌓기 좋음

지금 당신 Redis + 로그 구조랑 잘 맞음.

## ❌ 단점

### 1️⃣ JOIN이 약함

RDB처럼
```ts title="코드"
유저 + 주문 + 결제
```
복잡한 관계형 구조

👉 성능 떨어짐
👉 설계 어렵

즉:

금융 / 정산 / ERP → 부적합

### 2️⃣ 트랜잭션이 약함

요즘 지원은 하지만

MySQL / PostgreSQL 만큼 안정적이지 않음

→ 돈 관련 처리엔 위험

### 3️⃣ 데이터 중복 많아짐

JOIN 대신 문서에 다 넣음

→ 용량 증가
→ 데이터 정합성 관리 필요

### 4️⃣ 복잡한 집계 쿼리 어려움

통계 / 정렬 / 그룹핑

→ SQL이 훨씬 강함

주식 백테스트 같은 거 하면
PostgreSQL이 더 좋음.

## 🔥 당신 프로젝트 기준 평가

MongoDB 잘 맞는 영역

당신이 하는 것 중:

✅ 카카오톡 대화 로그
✅ LLM 응답 저장
✅ 사용자 설정
✅ JSON 구조 데이터
✅ 이벤트 로그

→ ⭐ 매우 좋음

## MongoDB 안 맞는 영역

❌ 결제 / IAP 정산
❌ 정확한 트랜잭션 필요한 데이터
❌ 복잡한 통계 분석

→ PostgreSQL 추천

## 🆚 Redis / MongoDB 역할 차이

당신 구조 기준:

Redis → 실시간 / 캐시 / 점수판
MongoDB → 영구 저장 로그

이 조합 많이 씀.

## ⭐ 실무에서 가장 많이 쓰는 구조

요즘 AI 서비스 백엔드:
  •  FastAPI
  •  Redis
  •  MongoDB
  •  PostgreSQL (정산용)

혼합 구조

## 🧾 한 줄 결론

MongoDB = “빠르게 만들고 JSON 많이 쓰는 서비스에 최적”
대신 “정합성 중요한 데이터에는 비추”
