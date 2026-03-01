---
title: Windows 서버에서 Node.js 20 설치
description: Windows 서버에서 이렇게 확인하면 됩니다.
---
![GPT 5.3-Codex](https://img.shields.io/badge/GPTCodex-5.3-00A67E?logo=openaigym&logoColor=white)


## Windows 서버에서 이렇게 확인하면 됩니다.

### 1. 설치 여부 확인


```ts title="powershell"
node -v
npm -v
```
판정 기준:

* node -v가 v20.x.x면 Node.js 20 OK
* npm -v 숫자 나오면 npm OK
* 명령을 찾을 수 없습니다류 에러면 미설치(또는 PATH 미등록)


### 2. 빠른 설치(권장: winget)
PowerShell(관리자 권한)에서:
```ts title="powershell"
winget install OpenJS.NodeJS.LTS
```
주의:

* NodeJS.LTS가 20이 아닐 수도 있으니 설치 후 node -v 재확인
* 20이 아니면 Node 20 MSI를 직접 설치(아래 3번)

### 3. Node.js 20 정확히 설치(수동)
### 4. Node.js 공식 사이트에서 Windows x64 Installer (.msi) 중 20.x LTS 다운로드
### 5. 설치 완료 후 새 PowerShell 열기
### 6. 확인:
```ts title="powershell"
node -v
```

## node -v
node: The term 'node' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.

### 1. winget 가능 여부 확인
```ts title="powershell"
winget --version
```

### 2. winget 가능하면 Node 20 설치
```ts title="powershell"
winget install --id OpenJS.NodeJS.20 --exact
```
버전은 검색 결과의 최신 20.x로 바꿔도 됩니다.

### 3.새 PowerShell 창 열고 확인
```ts title="powershell"
node -v
npm -v
```
v20.x.x 나오면 정상
### 4. winget이 없거나 실패하면 수동 설치
* [Node.js 다운로드](https://nodejs.org/en/download)에서 20.x LTS Windows Installer (.msi) 설치
* 설치 후 새 터미널에서 node -v, npm -v 확인
### 5. 설치했는데 여전히 인식 안 되면 PATH 확인
* 환경변수 Path에 C:\Program Files\nodejs\ 추가
* 터미널 재실행 또는 재부팅 후 재확인

## 20버전을 설치하는 이유
이 프로젝트 기준으로는 안정성/호환성 때문에 20을 권장한 겁니다.

핵심 이유:

1. 워크플로우가 이미 Node 20으로 고정됨
deploy-react-native-web.yml에서 node-version: "20" 사용
2. Expo/React Native 생태계에서 장기적으로 검증된 버전대
3. 로컬/러너/CI 버전을 맞춰야 배포 실패가 줄어듦
“내 PC에선 됨, Actions에선 실패” 같은 문제 방지

참고:

* 당장 22/24도 돌아갈 수는 있지만, 의존성 조합에 따라 빌드 이슈 가능성이 20보다 높습니다.
* 원하면 전체를 22 또는 24로 올릴 수는 있는데, 그 경우 워크플로우와 서버 버전을 같이 맞추고 한 번 검증 테스트를 해야 합니다.

## node -v
node: The term 'node' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.

Node는 설치됐고(C:\Program Files\nodejs\node.exe 존재), PATH에 nodejs 경로가 빠져있어서 인식이 안 됩니다.

지금 바로 실행:

### 현재 세션 즉시 적용
```ts title="powershell"
$env:Path += ";C:\Program Files\nodejs"
node -v
npm -v
```
정상 출력 확인 후 영구 적용:

###  사용자 PATH에 영구 추가 (중복 방지)
```ts title="powershell"
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*C:\Program Files\nodejs*") {
  [Environment]::SetEnvironmentVariable(
    "Path",
    ($userPath.TrimEnd(';') + ";C:\Program Files\nodejs"),
    "User"
  )
}
```
PowerShell 완전히 닫고 새 창에서 재확인:

```ts title="powershell"
node -v
npm -v
```
