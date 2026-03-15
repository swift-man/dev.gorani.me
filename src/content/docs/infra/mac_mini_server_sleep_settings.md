# Mac mini 잠자기 안 하게 서버용 터미널 설정

서버용이면 아래만 넣으면 됩니다.

```bash
# 1) SSH 켜기
sudo systemsetup -setremotelogin on

# 2) 시스템 잠자기 끄기
sudo systemsetup -setsleep Off

# 3) 네트워크로 깨우기 켜기
sudo systemsetup -setwakeonnetworkaccess on

# 4) 정전 후 자동 재부팅 켜기
sudo systemsetup -setrestartpowerfailure on

# 5) 전원 복구 후 30초 뒤 부팅
sudo systemsetup -setWaitForStartupAfterPowerFailure 30
```

`systemsetup`은 macOS에 포함된 도구이고, `-setremotelogin`, `-setsleep`, `-setwakeonnetworkaccess`, `-setrestartpowerfailure`, `-setWaitForStartupAfterPowerFailure`를 지원합니다. Apple 문서도 `-setsleep`에 `Never` 또는 `Off`를 쓸 수 있고, 잠자기에 들어가면 원격 관리가 안 된다고 설명합니다.

헤드리스 맥미니라면 `caffeinate`도 같이 쓰는 게 안전합니다. Apple은 headless Mac을 깨어 있게 두려면 터미널에서 `caffeinate`를 사용할 수 있다고 안내합니다.

```bash
# 현재 세션에서만 잠자기 강제 방지
caffeinate -d -i -m
```

터미널을 닫아도 유지하고 싶으면:

```bash
nohup caffeinate -d -i -m >/tmp/caffeinate.log 2>&1 &
```

중지:

```bash
pkill caffeinate
```

적용 확인은 이렇게 보세요.

```bash
sudo systemsetup -getremotelogin
sudo systemsetup -getsleep
pmset -g
```

서버용 추천 상태는 대략 이렇게 보이면 됩니다.

```text
autorestart 1
womp 1
sleep 0
displaysleep 0
disksleep 0
```

딱 한 번에 실행할 버전은 이겁니다.

```bash
sudo systemsetup -setremotelogin on && \
sudo systemsetup -setsleep Off && \
sudo systemsetup -setwakeonnetworkaccess on && \
sudo systemsetup -setrestartpowerfailure on && \
sudo systemsetup -setWaitForStartupAfterPowerFailure 30 && \
nohup caffeinate -d -i -m >/tmp/caffeinate.log 2>&1 &
```
