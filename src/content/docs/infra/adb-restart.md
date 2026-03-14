---
title: ADB 재구동
description: 기존 컨테이너가 정상 동작하면 굳이 재설치 안 해도 된다.
---
![GPT 5.3 Codex](https://img.shields.io/badge/ChatGPT-5.3Codex-00A67E?logo=openaigym&logoColor=white)

## 할 일은 Linux에서 다시 연결하는 겁니다.

```bash title="shell"
adb kill-server
adb start-server
adb connect 192.168.1.218:5555
adb devices
```

정상이라면 Linux에서 이렇게 보여야 합니다.
```bash title="shell"
List of devices attached
192.168.1.218:5555    device
```

그다음에:

```bash title="shell"
cd /home/jiniopening/iris_bot
./iris_control start
```

추가로:

• 태블릿 화면 켜둔 상태로 하세요  
• Linux에서 처음 붙는 거면 태블릿에 승인 팝업이 한 번 더 뜰 수 있습니다  
• 이상하면 Windows scrcpy는 잠깐 꺼두고 Linux에서 먼저 붙여보는 게 좋습니다  

한 줄 요약:

• Windows 연결 성공 = Windows만 성공  
• Linux에서 Iris 쓰려면 Linux에서도 adb connect를 따로 해야 함