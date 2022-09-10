import { atom } from 'recoil'

export const isShowSearchState = atom<boolean>({
  key: 'isShowSearchState',
  default: false,
})
