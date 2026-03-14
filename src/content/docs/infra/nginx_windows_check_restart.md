---
title: Windows 에서 nginx 구동
description: 윈도우에서 nginx가 살아있는지부터 확인하면 돼.
---
![GPT 5.4 Thinking](https://img.shields.io/badge/ChatGPT-5.4Thinking-00A67E?logo=openaigym&logoColor=white)

윈도우에서 nginx가 살아있는지부터 확인하면 돼.

### 1) nginx 실행 여부 확인

**PowerShell** 또는 **cmd**에서:

```powershell title="powershell"
tasklist | findstr nginx
```

또는

```powershell title="powershell"
Get-Process nginx -ErrorAction SilentlyContinue
```

아무것도 안 나오면 nginx가 안 떠 있는 거야.

포트도 같이 보면 좋다:

```powershell title="powershell"
netstat -ano | findstr :80
netstat -ano | findstr :443
```

80, 443 포트를 nginx가 잡고 있지 않으면 사이트 접속이 안 될 수 있어.

---

### 2) nginx 다시 시작

nginx 폴더로 가서 실행:

```powershell title="powershell"
cd C:\nginx
.\nginx.exe
```

이미 떠 있는데 꼬였을 수 있으면:

```powershell title="powershell"
cd C:\nginx
.\nginx.exe -s stop
taskkill /F /IM nginx.exe
.\nginx.exe
```

설정 문제 없는지도 같이 확인:

```powershell title="powershell"
cd C:\nginx
.\nginx.exe -t
```

`syntax is ok` / `test is successful` 나오면 설정은 정상.

---

### 3) 로그 확인

접속 안 될 때 제일 중요한 건 에러 로그야.

```powershell title="powershell"
cd C:\nginx
type .\logs\error.log
```

PowerShell이면 최근 로그만 보려면:

```powershell title="powershell"
Get-Content .\logs\error.log -Tail 50
```

---

### 4) nginx를 서비스로 등록한 경우

서비스 방식이면 이걸로 확인:

```powershell title="powershell"
sc query nginx
```

재시작:

```powershell title="powershell"
net stop nginx
net start nginx
```

또는 PowerShell:

```powershell title="powershell"
Restart-Service nginx
```

---

### 5) 가장 빠른 점검 순서

이 순서대로 하면 된다:

```powershell title="powershell"
tasklist | findstr nginx
cd C:\nginx
.\nginx.exe -t
.\nginx.exe
netstat -ano | findstr :80
netstat -ano | findstr :443
Get-Content .\logs\error.log -Tail 50
```

---

### 6) 재부팅 후 안 켜지는 흔한 이유

윈도우 nginx는 리눅스처럼 기본 서비스가 아니라서, **재부팅 후 자동 실행이 안 되는 경우**가 많아.  
즉 수동으로 `nginx.exe` 실행해야 하거나, 서비스/NSSM/작업 스케줄러로 등록해둬야 해.

지금 바로 확인하려면 먼저 이것부터 해봐:

```powershell title="powershell"
tasklist | findstr nginx
```

결과랑 `error.log` 마지막 20~50줄 보여주면 어디서 막히는지 바로 볼 수 있어.
