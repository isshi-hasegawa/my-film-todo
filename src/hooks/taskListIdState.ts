import { atom, useRecoilState } from 'recoil'

const taskListIdState = atom<string>({
  key: 'taskListIdState',
  default: '',
})

export const useTaskListIdState = () => {
  const [taskListId, setTaskListId] = useRecoilState<string>(taskListIdState)

  return {
    taskListId,
    setTaskListId,
  }
}
