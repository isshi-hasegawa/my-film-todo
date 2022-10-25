import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { deleteTask } from 'src/api/tasksApi'
import { useCustomToast } from 'src/hooks/useCustomToast'
import { useTaskListIdState } from 'src/hooks/useTaskListIdState'

export const useDeleteTask = () => {
  const { taskListId } = useTaskListIdState()
  const { data: session } = useSession()
  const token = session?.accessToken as string
  const queryClient = useQueryClient()
  const customToast = useCustomToast()

  return useMutation(
    async (taskId: string) => await deleteTask({ taskListId, taskId }, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks'])
        customToast('タスクを削除しました！', 'success')
      },
      onError: () => customToast('タスクを削除できませんでした…', 'error'),
    }
  )
}
