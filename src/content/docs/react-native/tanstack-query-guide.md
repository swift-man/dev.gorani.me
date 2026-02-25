---
title: TanStack Query
description: TanStack Query 가이드
---
![ChatGPT 5.2](https://img.shields.io/badge/ChatGPT-5.2-00A67E?logo=openaigym&logoColor=white)

## TanStack Query (구 React Query) 한방 정리

서버 상태(Server State) 관리 라이브러리  
→ API 호출, 캐싱, 로딩/에러 상태, 자동 refetch 등을 전부 처리해줌.

iOS의 async/await + cache layer + Combine/Rx 느낌이라고 보면 됨 🙂

## 🔥 왜 쓰냐 (핵심 가치)
* 요청 결과 자동 캐싱
* 같은 쿼리 중복 호출 방지
* background refetch
* stale / fresh 관리
* pagination / infinite scroll 내장
* mutation 후 자동 invalidate

👉 상태관리 라이브러리(Zustand, Redux) 대체용이 아님  
👉 서버 데이터 전용

## 📦 설치

React / Next / Expo / RN 공통
```ts title="bash"
npm i @tanstack/react-query
```

## ⚙️ 기본 세팅
```ts title="tsx"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Root />
    </QueryClientProvider>
  )
}
```

## 📡 기본 사용 (GET)
```ts title="tsx"
const fetchUsers = async () => {
  const res = await axios.get('/users')
  return res.data
}

const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
})
```

## 🧠 캐싱 개념
```ts title="tsx"
queryKey: ['users', page]
```
→ key 기준으로 캐시됨  
→ page 바뀌면 자동 refetch

## ⏱ 주요 옵션
```ts title="tsx"
useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,

  staleTime: 1000 * 60,      // fresh 유지 시간
  cacheTime: 1000 * 60 * 5,  // 캐시 유지 시간
  refetchOnWindowFocus: false,
  retry: 1,
})
```

## ✏️ POST / PUT / DELETE → mutation
```ts title="tsx"
const mutation = useMutation({
  mutationFn: addUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] })
  },
})
```

```ts title="tsx"
mutation.mutate({ name: 'gorani' })
```

## ♻️ 자동 리패칭 시점
기본적으로: 
* window focus
* 네트워크 reconnect
* mount

에서 refetch됨.

## 📜 Infinite Scroll
```ts title="tsx"
useInfiniteQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  getNextPageParam: lastPage => lastPage.nextCursor,
})
```

## 🧩 DevTools
```ts title="bash"
npm i @tanstack/react-query-devtools
```

```ts title="tsx"
<ReactQueryDevtools />
```
👉 캐시 상태 실시간 확인 가능 (개꿀)

## 🆚 Zustand / Redux / SWR 비교
| 항목            | TanStack Query |
|-----------------|----------------|
| 서버 상태       | ✅ 최강        |
| 클라이언트 상태 | ❌             |
| 캐싱            | ✅             |
| mutation        | ✅             |
| 자동 refetch    | ✅             |
| pagination      | ✅             |

## 💡 너한테 중요한 포인트 (RN + 주식/봇 앱 기준)
네 구조 보면:
* 실시간 데이터
* API 많음
* 캐싱 중요
* refetch 타이밍 중요

👉 TanStack Query 쓰면
* 시세 API 중복 호출 제거
* 화면 전환해도 데이터 유지
* 자동 새로고침

가능함.


## 🧠 Swift 개발자 관점 비유
| iOS              | TanStack Query     |
|------------------|--------------------|
| Repository       | queryFn            |
| Cache layer      | Query Cache        |
| ViewModel state  | useQuery result    |
| reload trigger   | invalidateQueries  |

## 🚀 고급 기능 (실무 핵심)
### Prefetch
```ts title="ts"
queryClient.prefetchQuery(...)
```
### Optimistic update
```ts title="ts"
onMutate
```

### Suspense 모드
```ts title="ts"
suspense: true
```

## 📌 결론
React / RN에서:

👉 서버 데이터 다루면 필수급 라이브러리
