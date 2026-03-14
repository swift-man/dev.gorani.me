---
title: 리눅스 재부팅 명령어
description: 리눅스 서버 재부팅과 종료 명령, 재부팅 후 프로세스 확인 방법을 정리합니다.
---
![GPT 5.4-Codex](https://img.shields.io/badge/GPTCodex-5.4-00A67E?logo=openaigym&logoColor=white)

## 리눅스 서버를 재부팅하면 어떻게 되나

네. 서버를 재부팅하면 지금 직접 띄운 파이썬 프로세스들은 보통 다시 안 뜹니다.

## 재부팅 명령

```bash title="shell"
sudo reboot
```

또는

```bash title="shell"
sudo shutdown -r now
```

## 종료 명령

```bash title="shell"
sudo shutdown -h now
```

또는

```bash title="shell"
sudo poweroff
```

## 재부팅 후

지금처럼 `python3 xxx.py`, `nohup ... &` 로 띄운 것들이면 보통 다시 수동 실행해야 합니다.

즉 재부팅 후 다시 켜야 할 가능성이 큽니다:

- `irispy.py`
- `nickname_observer.py`
- `thread.py`
- `lottoAlarm.py`
- `attendance_calendar.py`
- `realtime.py`
- 그 외 상시 봇들

## 예외

아래처럼 등록돼 있으면 자동 시작됩니다.

- `systemd`
- `pm2`
- `supervisor`
- `crontab @reboot`

## 먼저 확인

```bash title="shell"
ps -ef | grep python3 | grep -v grep
```

재부팅 후에도 자동으로 올릴 설정이 없다면, 직접 다시 실행해야 합니다.
