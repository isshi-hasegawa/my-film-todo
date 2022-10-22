import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

const keywordState = atom<string>({
  key: 'keywordState',
  default: '',
})

export const useKeywordState = () => {
  const keyword = useRecoilValue<string>(keywordState)
  const setKeyword = useSetRecoilState<string>(keywordState)

  return {
    keyword,
    setKeyword,
  }
}
