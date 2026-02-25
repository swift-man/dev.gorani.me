---
title: RN + TanStack Query
description: 원칙은 UI(.tsx) ↔ 서버상태(.ts hooks) ↔ API(.ts) 3층 분리.
---
![ChatGPT 5.2](https://img.shields.io/badge/ChatGPT-5.2-00A67E?logo=openaigym&logoColor=white)

아래처럼 나누면 RN + TanStack Query에서 제일 깔끔하게 굴러가요.
원칙은 UI(.tsx) ↔ 서버상태(.ts hooks) ↔ API(.ts) 3층 분리.

## 추천 폴더 구조
```ts title="text"
src/
  app/
    App.tsx
    queryClient.ts
  lib/
    api/
      client.ts          # axios/fetch 래퍼
      endpoints.ts       # URL 상수(선택)
    query/
      keys.ts            # queryKey 공장
      options.ts         # 공통 옵션(선택)
  features/
    tournament/
      api.ts             # fetch 함수들 (.ts)
      queries.ts         # useQuery/useMutation 훅 (.ts)
      types.ts           # DTO/Model (.ts)
      mapper.ts          # DTO -> Model 변환 (.ts, 선택)
      TournamentScreen.tsx
      TournamentCard.tsx
    ranking/
      api.ts
      queries.ts
      types.ts
      RankingScreen.tsx
  shared/
    components/
      Loading.tsx
      ErrorView.tsx
    utils/
      date.ts
```

### 1) QueryClient는 app 레벨에서 1번만
src/app/queryClient.ts (.ts)
```ts title="ts"
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      refetchOnReconnect: true,
    },
  },
})
```
src/app/App.tsx (.tsx)
```ts title="ts"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './queryClient'
import RootNavigator from './RootNavigator'

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator />
    </QueryClientProvider>
  )
}
```

### 2) API 함수는 .ts (React 모르면 됨)
features/tournament/api.ts
```ts title="ts"
import { api } from '@/lib/api/client'
import type { TournamentPostDTO } from './types'

export const fetchTournamentPosts = async (): Promise<TournamentPostDTO[]> => {
  const res = await api.get('/tournament') // 예시
  return res.data
}
```

### 3) TanStack Query 훅은 .ts
features/tournament/queries.ts
```ts title="ts"
import { useQuery } from '@tanstack/react-query'
import { fetchTournamentPosts } from './api'
import { qk } from '@/lib/query/keys'

export const useTournamentPosts = () =>
  useQuery({
    queryKey: qk.tournament.posts(),
    queryFn: fetchTournamentPosts,
  })
```
lib/query/keys.ts
```ts title="ts"
export const qk = {
  tournament: {
    posts: () => ['tournament', 'posts'] as const,
    post: (id: string) => ['tournament', 'post', id] as const,
  },
  ranking: {
    daily: (roomId: string) => ['ranking', 'daily', roomId] as const,
  },
}
```
### 4) 화면(UI)은 .tsx (훅만 호출)
features/tournament/TournamentScreen.tsx
```ts title="tsx"
import { View, Text } from 'react-native'
import { useTournamentPosts } from './queries'
import Loading from '@/shared/components/Loading'
import ErrorView from '@/shared/components/ErrorView'

export default function TournamentScreen() {
  const { data, isLoading, error, refetch } = useTournamentPosts()

  if (isLoading) return <Loading />
  if (error) return <ErrorView onRetry={refetch} />

  return (
    <View>
      {data?.map(p => (
        <Text key={p.url}>{p.title}</Text>
      ))}
    </View>
  )
}
```
### 5) Mutation도 동일 패턴
* API: .ts에서 POST 함수
* Hook: .ts에서 useMutation + invalidateQueries
* UI: .tsx에서 mutate() 호출

### 룰 한 줄 요약
* .tsx: 화면/컴포넌트 (JSX 있음)
* .ts: API, types, query keys, hooks(useQuery/useMutation), utils (JSX 없음)
* UI는 “데이터 가져오기 방법”을 몰라야 함 → 훅만 호출
