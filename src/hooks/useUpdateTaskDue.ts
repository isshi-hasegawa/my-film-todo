import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { updateTask } from 'src/api/tasksApi'
import { useCustomToast } from 'src/hooks/useCustomToast'
import { useTaskListIdState } from 'src/hooks/useTaskListIdState'

export const useUpdateTaskDue = () => {
  const { taskListId } = useTaskListIdState()
  const { data: session } = useSession()
  const token = session?.accessToken as string
  const queryClient = useQueryClient()
  const customToast = useCustomToast()

  return useMutation(
    async ({ taskId, due }: { taskId: string; due?: string }) =>
      await updateTask({ taskListId, taskId, due }, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks'])
        customToast('タスクの期限を更新しました！', 'success')
      },
      onError: () =>
        customToast('タスクの期限を更新できませんでした…', 'error'),
    }
  )
}
