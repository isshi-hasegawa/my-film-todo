import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { updateTask } from 'src/api/tasksApi'
import { useCustomToast } from 'src/hooks/useCustomToast'
import { useTaskListIdState } from 'src/hooks/useTaskListIdState'

export const useCompleteTask = () => {
  const { taskListId } = useTaskListIdState()
  const { data: session } = useSession()
  const token = session?.accessToken as string
  const queryClient = useQueryClient()
  const customToast = useCustomToast()

  return useMutation(
    async (taskId: string) =>
      await updateTask({ taskListId, taskId, status: 'completed' }, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks'])
        customToast('タスクを完了しました！', 'success')
      },
      onError: () => customToast('タスクを完了できませんでした…', 'error'),
    }
  )
}
