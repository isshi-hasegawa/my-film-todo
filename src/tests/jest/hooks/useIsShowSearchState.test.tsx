import { renderHook } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import { useIsShowSearchState } from 'src/hooks/useIsShowSearchState'

test('useIsShowSearchState', () => {
  const { result } = renderHook(() => useIsShowSearchState(), {
    wrapper: RecoilRoot,
  })
  expect(result.current.isShowSearch).toEqual(false)
})
