---
title: react-native-vector-icons
description: 가장 많이 쓰는 방법
---
![ChatGPT 5.2](https://img.shields.io/badge/ChatGPT-5.2-00A67E?logo=openaigym&logoColor=white)

✅ Material Icons / Material Symbols는 React Native에서도 사용 가능  
하지만 웹처럼 <link>로 바로 쓰는 방식은 ❌  
→ RN에서는 아이콘 폰트 라이브러리로 써야 함.


## 🏆 가장 많이 쓰는 방법 — react-native-vector-icons
### 설치
```ts title="bash"
npm install react-native-vector-icons
```
### 사용 (Material Icons)
```ts title="tsx"
import Icon from 'react-native-vector-icons/MaterialIcons';

<Icon name="home" size={24} color="#333" />
```
끝.

## 🎨 지원되는 Material 아이콘 종류
```ts title="tsx"
MaterialIcons
MaterialCommunityIcons   ← ⭐ 가장 많아서 많이 씀
```
예:
```ts title="tsx"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

<Icon name="heart" size={24} color="red" />
```
## 🚀 Expo 쓰면 더 쉬움

```ts title="bash"
expo install @expo/vector-icons
```
예:
```ts title="tsx"
import { MaterialIcons } from '@expo/vector-icons';

<MaterialIcons name="search" size={24} color="black" />
```

## 📦 Material Symbols (최신 버전)은?
여기 중요 ⚠️

Material Symbols는 variable font 기반

RN에서는:

❌ 직접 사용 거의 안 함  
(가변 폰트 지원 이슈 + 설정 복잡)

그래서 실무에서는:

👉 MaterialIcons  
👉 MaterialCommunityIcons

사용.

## ⚡ SVG 방식도 가능
```ts title="tsx"
npm install react-native-svg
```
하지만:

❌ Material Icons 전체 관리 어려움  
→ 보통 폰트 방식 사용

## 🏆 정리

| 환경 | Material Icons |
| :--- | :--- |
| Web | ✅ CDN 사용 |
| React Native | ✅ vector-icons |
| Expo | ✅ @expo/vector-icons |
| iOS SwiftUI | ❌ (SF Symbols 사용) |

## Material Symbols, MaterialCommunityIcons 차이
핵심만 정확하게 정리해줄게 👍  
Material Symbols vs MaterialCommunityIcons는  
👉 같은 “Material 느낌 아이콘”이지만  
출처 / 개념 / 기능 / 사용 환경이 완전히 다름.  

## 🧩 한눈에 비교
| 항목 | Material Symbols | MaterialCommunityIcons |
| :--- | :--- | :--- |
| 출처 | Google 공식 | 커뮤니티 (Pictogrammers) |
| 디자인 시스템 | Material 3 | Material 느낌 확장판 |
| 아이콘 수 | ~2,500+ | ~7,000+ 😳 |
| 스타일 | variable (weight / fill 등) | 고정 스타일 |
| 웹 지원 | ✅ (CDN) | ❌ (폰트/SVG 필요) |
| React Native | ⚠️ 거의 안 씀 | ✅ 표준처럼 사용 |
| iOS 앱 | ❌ | ❌ |
| 라이선스 | Apache 2.0 | Apache 2.0 |
| 대표 사용처 | Web / Android | React Native / Flutter |

## 🎨 1️⃣ Material Symbols (Google 공식 최신)

👉 Material Icons의 차세대 버전

특징
* Variable font 😈
* weight 조절
* fill (outline ↔ filled)
* optical size
* grade

예:
```ts title="css"
font-variation-settings:
'FILL' 1,
'wght' 700,
'GRAD' 0,
'opsz' 48
```
### 장점

✅ Google 공식 디자인  
✅ 웹 최적화  
✅ 애니메이션 친화적  

### 단점

❌ RN에서 거의 안 씀  
❌ 아이콘 수 CommunityIcons보다 적음

### 🧩 2️⃣ MaterialCommunityIcons (실무에서 많이 씀)

👉 Pictogrammers 프로젝트  
👉 원래 Material Icons 확장판

RN에서 사실상 기본 아이콘 세트 수준.

### 특징
* 아이콘 수 미쳤음 (~7000+)
* 브랜드 아이콘 있음
* 개발자용 아이콘 많음
* 다양한 상태 아이콘

예:
```ts title="tsx"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

<Icon name="account" size={24} />
```

### 장점

✅ RN에서 최적  
✅ 아이콘 개수 압도적  
✅ 서비스 UI 만들기 좋음  
✅ 브랜드 아이콘 지원  

### 단점

❌ Material 공식 디자인은 아님  
❌ variable weight 없음

## 🏆 실무 기준 선택법

### 🌐 웹  

👉 Material Symbols

이유:
* CDN
* 가변 폰트
* Google 공식

### 📱 React Native

👉 MaterialCommunityIcons (정답 수준)

이유:
* react-native-vector-icons 기본 지원
* 아이콘 수 많음
* RN 친화적

## 😎 너 같은 멀티플랫폼 구조 기준 베스트 전략
| 플랫폼 | 아이콘 |
| :--- | :--- |
| iOS | SF Symbols |
| Web | Material Symbols |
| RN | MaterialCommunityIcons |

→ 이 조합이 가장 많음

## 💡 디자인 통일 팁 (중요 ⭐)

통일하려면:
* outline 스타일만 사용
* stroke 두께 맞추기
* 크기 24pt 기준

그러면 거의 같은 UX.

## 🚀 결론

Material Symbols =  
👉 Google 공식 / 웹 / 가변 폰트 / 디자인 시스템용

MaterialCommunityIcons =  
👉 RN 실전용 / 아이콘 수 최강 / 서비스 UI용
