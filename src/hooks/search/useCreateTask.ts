import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { createTask } from 'src/api/tasksApi'
import { getMovieData } from 'src/api/tmdbApi'
import { useCustomToast } from 'src/hooks/useCustomToast'
import { useTaskListIdState } from 'src/hooks/useTaskListIdState'

export const useCreateTask = () => {
  const { taskListId } = useTaskListIdState()
  const { data: session } = useSession()
  const token = session?.accessToken as string
  const customToast = useCustomToast()

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

  const queryClient = useQueryClient()

  return useMutation(
    async (id: number) => await createTaskWithSearchResult(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['taskLists'])
        customToast('タスクを登録しました！', 'success')
      },
      onError: () => customToast('タスクの登録に失敗しました…', 'error'),
    }
  )
}
