import { atom } from 'recoil'

export const taskListIdState = atom<string>({
  key: 'taskListIdState',
  default: '',
})
