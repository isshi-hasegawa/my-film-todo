import { renderHook } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import { useTaskListIdState } from 'src/hooks/useTaskListIdState'

test('useTaskListIdState', () => {
  const { result } = renderHook(() => useTaskListIdState(), {
    wrapper: RecoilRoot,
  })
  expect(result.current.taskListId).toEqual('')
})
