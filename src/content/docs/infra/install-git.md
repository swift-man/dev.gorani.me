---
title: Windows 서버에서 Git 설치
description: Windows 서버에서 이렇게 확인하면 됩니다.
---
![GPT 5.3-Codex](https://img.shields.io/badge/GPTCodex-5.3-00A67E?logo=openaigym&logoColor=white)
### 1. 설치 여부 확인


```ts title="powershell"
git --version
```

### 2. 빠른 설치(권장: winget)
PowerShell(관리자 권한)에서:
```ts title="powershell"
winget install Git.Git
```

## git --version
git: The term 'git' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.

설치 자체는 정상이고, 이제 PATH만 추가하면 됩니다.

현재 창에서 바로 인식시키기:
```ts title="powershell"
$env:Path += ";C:\Program Files\Git\cmd;C:\Program Files\nodejs"
git --version
node -v
npm -v
```
영구 적용(사용자 PATH):
```ts title="powershell"
$target = "User"
$path = [Environment]::GetEnvironmentVariable("Path", $target)

if ($path -notlike "*C:\Program Files\Git\cmd*") {
  $path = ($path.TrimEnd(';') + ";C:\Program Files\Git\cmd")
}
if ($path -notlike "*C:\Program Files\nodejs*") {
  $path = ($path.TrimEnd(';') + ";C:\Program Files\nodejs")
}

[Environment]::SetEnvironmentVariable("Path", $path, $target)
```
그다음 PowerShell 완전히 닫고 새로 열어서 재확인:
```ts title="powershell"
git --version
node -v
npm -v
```
