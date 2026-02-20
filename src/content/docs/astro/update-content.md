---
title: AstroWind 컨텐츠 수정하기
description: 이 프로젝트는 Astro 템플릿이라, 컨텐츠 수정은 주로 여기입니다.
---
![GPT 5.3-Codex](https://img.shields.io/badge/GPTCodex-5.3-00A67E?logo=openaigym&logoColor=white)

* 페이지 본문: /src/pages
* 블로그 글: /src/data/post
* 홈/섹션 텍스트 설정(위젯 데이터): config.yaml
* 공통 레이아웃(헤더/푸터 포함): /src/layouts, /src/components/widgets

빠른 시작:

1. 랜딩 메인 수정: index.astro
2. 블로그 글 추가/수정: *.md|*.mdx
3. SEO/사이트 기본값: config.yaml

## 최상단 타이틀을 수정한다면 어느 파일을 수정해야 해?

그 문구는 메인 페이지 파일에서 수정합니다.

* 브라우저 탭/SEO 타이틀: index.astro (line 16)
* 화면에 보이는 헤드라인 텍스트: index.astro (line 38)
즉, 대부분은 index.astro 하나만 고치면 됩니다.

## 최상단 이미지를 변경하려면 어떻게 해?
```ts title="astro"
image={{ src: '~/assets/images/my-hero.png', alt: 'My Hero Image' }}
```
이미지 파일은 보통 여기에 넣으면 됩니다.

/src/assets/images/
