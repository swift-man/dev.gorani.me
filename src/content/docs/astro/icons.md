---
title: AstroWind에서 쓰는 tabler:download 같은 아이콘 전체목록
description: Iconify + Tabler Icons 조합
---
![ChatGPT 5.2](https://img.shields.io/badge/ChatGPT-5.2-00A67E?logo=openaigym&logoColor=white)

AstroWind에서 쓰는 tabler:download 같은 아이콘은  
👉 Iconify + Tabler Icons 조합이야.

그래서 아이콘 목록은 Tabler 공식 사이트에서 보면 돼 👍

## 🔎 아이콘 전체 목록 보는 곳
### ✅ 1️⃣ Tabler Icons 공식 사이트

👉 https://tabler-icons.io/

여기서:
* 검색 가능
* 이름 확인 가능
* 미리보기 가능

예:  
download 검색 →  
→ 이름 = download

AstroWind에서는 이렇게 씀:
```ts title="astro"
icon="tabler:download"
```

### ✅ 2️⃣ Iconify 아이콘 검색 (실제 Astro에서 쓰는 형식)
👉 https://icon-sets.iconify.design/tabler/

여기가 더 정확함 😆

왜냐면 AstroWind는 내부적으로:
```ts title="astro"
<Icon name="tabler:download" />
```
이 형식이라  
Iconify 기준 이름을 써야 함.

## ✨ 사용 방법 정리
### 1️⃣ 아이콘 찾기

Iconify에서 검색

예:
* alarm → tabler:alarm
* robot → tabler:robot
* brand-kakao → tabler:brand-kakao

### 2️⃣ Astro에서 사용
```ts title="astro"
<Icon name="tabler:download" />
```

또는 AstroWind 버튼:
```ts title="astro"
icon="tabler:download"
```
