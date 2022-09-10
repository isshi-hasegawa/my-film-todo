import { atom, useRecoilState } from 'recoil'

const isShowSearchState = atom<boolean>({
  key: 'isShowSearchState',
  default: false,
})

export const useIsShowSearchState = () => {
  const [isShowSearch, setIsShowSearch] =
    useRecoilState<boolean>(isShowSearchState)

  return {
    isShowSearch,
    setIsShowSearch,
  }
}
