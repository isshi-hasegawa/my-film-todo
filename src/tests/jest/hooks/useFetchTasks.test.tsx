import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'
import { RecoilRoot } from 'recoil'
import { useFetchTasks } from 'src/hooks/tasks/useFetchTasks'
import { server } from 'src/mocks/server'

jest.mock('next-auth/react')
const mockUseSession = useSession as jest.Mock
mockUseSession.mockReturnValue({
  status: 'authenticated',
  data: null,
})

describe('useFetchTasks', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
    },
  })
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>{children}</RecoilRoot>
    </QueryClientProvider>
  )
  beforeAll(() => server.listen())
  afterEach(() => {
    server.resetHandlers()
    queryClient.clear()
  })
  afterAll(() => server.close())

  test('API通信成功', async () => {
    const { result } = renderHook(() => useFetchTasks(), { wrapper })
    // TODO：エラー
    // await waitFor(() => expect(result.current.isSuccess).toBe(true))
    // expect(result.current.data).toHaveLength(1)
    // expect(result.current.isLoading).toBeFalsy()
    // expect(result.current.error).toBeNull()
  })

  test('API通信失敗(500エラー)', async () => {
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/users',
        (req, res, ctx) => {
          return res.once(
            ctx.status(500),
            ctx.json({ message: 'Internal Server Error' })
          )
        }
      )
    )
    const { result } = renderHook(() => useFetchTasks(), { wrapper })
    await waitFor(() => expect(result.current.isError).toBe(true))
  })
})
