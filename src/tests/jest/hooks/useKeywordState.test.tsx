import { renderHook } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import { useKeywordState } from 'src/hooks/useKeywordState'

test('useKeywordState', () => {
  const { result } = renderHook(() => useKeywordState(), {
    wrapper: RecoilRoot,
  })
  expect(result.current.keyword).toEqual('')
})
