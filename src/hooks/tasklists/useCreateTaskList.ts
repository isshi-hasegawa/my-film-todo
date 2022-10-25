import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { createTaskList } from 'src/api/taskListsApi'
import { useCustomToast } from 'src/hooks/useCustomToast'

export const useCreateTaskList = () => {
  const { data: session } = useSession()
  const token = session?.accessToken as string
  const customToast = useCustomToast()
  const queryClient = useQueryClient()

  return useMutation(() => createTaskList({ title: '新しいリスト' }, token), {
    onSuccess: () => {
      queryClient.invalidateQueries(['taskLists'])
      customToast('新しいリストを登録しました！', 'success')
    },
    onError: () => customToast('新しいリストの登録に失敗しました…', 'error'),
  })
}
