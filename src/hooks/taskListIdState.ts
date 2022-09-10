import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

const taskListIdState = atom<string>({
  key: 'taskListIdState',
  default: '',
})

export const useTaskListIdState = () => {
  const taskListId = useRecoilValue<string>(taskListIdState)
  const setTaskListId = useSetRecoilState<string>(taskListIdState)

  return {
    taskListId,
    setTaskListId,
  }
}
