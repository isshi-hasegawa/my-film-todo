import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

const isShowSearchState = atom<boolean>({
  key: 'isShowSearchState',
  default: false,
})

export const useIsShowSearchState = () => {
  const isShowSearch = useRecoilValue<boolean>(isShowSearchState)
  const setIsShowSearch = useSetRecoilState<boolean>(isShowSearchState)
  return {
    isShowSearch,
    setIsShowSearch,
  }
}
