import { useSession } from 'next-auth/react'
import { createTask, updateTask, deleteTask } from 'src/api/tasksApi'
import { useTaskListIdState } from 'src/hooks/useTaskListIdState'
import { getMovieData } from 'src/api/tmdbApi'
import { useCustomToast } from './useCustomToast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useTasks = () => {
  const { taskListId } = useTaskListIdState()
  const { data: session } = useSession()
  const token = session?.accessToken as string

  const createTaskWithSearchResult = async (id: number) => {
    const response = await getMovieData(id, 'watch/providers')
    const title = response.title
    let notes: string = ''
    response['watch/providers']?.results?.JP?.flatrate?.forEach((provider) => {
      switch (provider.provider_name) {
        case 'Netflix':
          notes = notes.concat('Netflix', ' ')
          break
        case 'Amazon Prime Video':
          notes = notes.concat('Amazon Prime Video', ' ')
          break
        case 'Disney Plus':
          notes = notes.concat('Disney+', ' ')
          break
        default:
          break
      }
    })
    notes = notes.concat(`${response.runtime}分`)

    await createTask({ taskListId, title, notes }, token)
  }

  const completeTask = async (taskId: string) => {
    await updateTask({ taskListId, taskId, status: 'completed' }, token)
  }

  const updateTaskDue = async (taskId: string, due: string = '') => {
    await updateTask({ taskListId, taskId, due }, token)
  }

  const deleteOneTask = async (taskId: string) => {
    await deleteTask({ taskListId, taskId }, token)
  }

  const customToast = useCustomToast()

  const queryClient = useQueryClient()
  const { mutate: completeTaskMutate } = useMutation(
    (taskId: string) => completeTask(taskId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks'])
        customToast('タスクを完了しました！', 'success')
      },
      onError: () => customToast('タスクを完了できませんでした…', 'error'),
    }
  )
  const { mutate: updateTaskDueMutate } = useMutation(
    ({ taskId, due }: { taskId: string; due?: string }) =>
      updateTaskDue(taskId, due),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks'])
        customToast('タスクの期限を更新しました！', 'success')
      },
      onError: () =>
        customToast('タスクの期限を更新できませんでした…', 'error'),
    }
  )
  const { mutate: deleteTaskMutate } = useMutation(
    (taskId: string) => deleteOneTask(taskId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks'])
        customToast('タスクを削除しました！', 'success')
      },
      onError: () => customToast('タスクを削除できませんでした…', 'error'),
    }
  )

  return {
    createTaskWithSearchResult,
    completeTaskMutate,
    updateTaskDueMutate,
    deleteTaskMutate,
  }
}
