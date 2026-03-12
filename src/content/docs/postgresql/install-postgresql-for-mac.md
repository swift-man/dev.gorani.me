---
title: macOS 에서 PostgreSQL 설치
description: macOS 에서 이렇게 확인하면 됩니다.
---
![GPT 5.4 Thinking](https://img.shields.io/badge/ChatGPT-5.4Thinking-00A67E?logo=openaigym&logoColor=white)

맥에서 가장 무난한 방법은 두 가지예요.
하나는 EDB 설치판으로 한 번에 PostgreSQL + pgAdmin까지 같이 설치하는 방법이고, 다른 하나는 Homebrew로 PostgreSQL 설치 후 GUI는 pgAdmin 또는 DBeaver로 붙이는 방법입니다. PostgreSQL 공식 사이트도 macOS용으로 EDB installer, Postgres.app, Homebrew를 주요 선택지로 안내하고 있고, EDB installer에는 pgAdmin이 포함됩니다.  [PostgreSQL](https://www.postgresql.org/download/macosx/)

저라면 개발용은 Homebrew + pgAdmin 조합으로 갑니다. 버전 관리가 편하고, CLI/GUI 둘 다 쓰기 좋습니다. pgAdmin은 PostgreSQL 공식 GUI이고, macOS용 앱 번들로 Intel/Apple Silicon을 지원하며 DMG를 열어서 앱 폴더로 드래그해 설치합니다. DBeaver도 macOS 11+에서 동작하는 대안 GUI입니다.  ￼[pgAdmin](https://www.pgadmin.org/download/pgadmin-4-macos/)

### 1) Homebrew 설치

Homebrew가 없다면 먼저 설치하세요.

맥 미니 M4에서 가장 무난한 순서는 이겁니다.
```ts title="bash"
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
Homebrew는 Apple Silicon 기준 기본 prefix가 /opt/homebrew입니다.  ￼[Homebrew](https://brew.sh/)

### 2) PostgreSQL 설치

현재 Homebrew에는 postgresql@17과 postgresql@18이 있고, postgresql@17 formula의 현재 stable은 17.9입니다. 처음엔 17로 시작해도 충분합니다.
```ts title="bash"
brew install postgresql@17
```

이 formula는 keg-only라서 PATH를 잡아주는 게 안전합니다. 또 설치 시 기본 database cluster도 초기화됩니다.  ￼[Homebrew Formula](https://formulae.brew.sh/formula/postgresql%4017)

### 3) PATH 설정

zsh 기준으로 아래처럼 추가하세요.
```ts title="bash"
echo 'export PATH="$(brew --prefix)/opt/postgresql@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```
그다음 확인:
```ts title="bash"
psql --version
```
### 4) PostgreSQL 실행

백그라운드 서비스로 띄웁니다.
```ts title="bash"
brew services start postgresql@17
brew services list
```
### 5) 최초 접속

Homebrew 기본 initdb 흐름에서는 초기 superuser가 cluster를 만든 macOS 사용자명과 같아지는 경우가 일반적이고, 초기 cluster에는 기본적으로 postgres 데이터베이스가 들어 있습니다. 그래서 보통 아래처럼 먼저 붙어보면 됩니다. [PostgreSQL](https://www.postgresql.org/docs/current/database-roles.html?utm_source=chatgpt.com)
```ts title="bash"
psql postgres
```
여기서 비밀번호 없이 붙으면, GUI 접속용 비밀번호를 하나 설정해두는 게 좋습니다.
```ts title="sql"
ALTER USER <내맥계정명> WITH PASSWORD '원하는비밀번호';
```
끝나면:
```ts title="sql"
\q
```
### 6) GUI 설치: pgAdmin

공식 GUI를 쓰려면 pgAdmin 4 macOS 버전을 설치하세요. DMG를 열고 앱을 원하는 위치로 드래그하면 됩니다.  ￼[pgAdmin](https://www.pgadmin.org/download/pgadmin-4-macos/)

### 7) pgAdmin에서 로컬 DB 연결

pgAdmin에서 Register > Server로 새 서버를 추가하고, Connection 탭에 아래처럼 넣으면 됩니다.  
  •  Host name/address: localhost  
  •  Port: 5432  
  •  Maintenance database: postgres  
  •  Username: 보통 <내맥계정명>  
  •  Password: 위에서 설정한 비밀번호

pgAdmin 공식 문서도 연결 화면에서 Host, Port(기본 5432), Maintenance DB, Username을 입력하도록 안내합니다. EDB installer 방식이면 기본 사용자명이 postgres인 경우가 많습니다.  ￼[pgAdmin](https://www.pgadmin.org/docs/pgadmin4/9.11/server_dialog.html?utm_source=chatgpt.com)

### 8) 더 쉬운 대안

터미널을 거의 안 쓰고 싶으면 Postgres.app도 좋습니다. 앱을 Applications로 옮겨 실행한 뒤 Initialize만 누르면 cluster가 생성되고, 필요하면 안내된 PATH 설정으로 psql도 쓸 수 있습니다. Postgres.app은 메뉴바 앱 형태로 실행되며, 기본적으로 최신 지원 버전 cluster를 구성해줍니다.  ￼[Postgres app](https://postgresapp.com/documentation/install.html)

자주 막히는 포인트

psql: command not found가 뜨면 거의 항상 PATH 문제입니다.
```ts title="bash"
echo 'export PATH="$(brew --prefix)/opt/postgresql@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```
pgAdmin에서 연결 실패하면 먼저 서비스 상태부터 확인하세요.
```ts title="bash"
brew services list
```
