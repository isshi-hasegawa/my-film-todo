import { useSession } from 'next-auth/react'
import { createTask } from 'src/api/tasksApi'
import { useTaskListIdState } from 'src/hooks/useTaskListIdState'
import { getMovieData } from 'src/api/tmdbApi'

export const useCreateTask = () => {
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

  return {
    createTaskWithSearchResult,
  }
}
