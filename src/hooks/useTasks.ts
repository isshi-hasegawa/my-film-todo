import { useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { getTasks, createTask, updateTask, deleteTask } from 'src/api/tasksApi'
import { useTaskListIdState } from 'src/hooks/useTaskListIdState'
import { Task } from 'src/types/tasks'
import { getMovieData } from 'src/api/tmdbApi'

export const useTasks = () => {
  const { taskListId } = useTaskListIdState()
  const { data: session } = useSession()
  const token = session?.accessToken as string

  const fetchAllTasks = useCallback(async () => {
    let tasks: Task[] = []
    let nextPageToken: string = ''
    do {
      const response = await getTasks({ taskListId, nextPageToken }, token)
      tasks = [...tasks, ...response.items]
      if (response.nextPageToken?.length) {
        nextPageToken = response.nextPageToken
      } else {
        nextPageToken = ''
      }
    } while (nextPageToken.length)

    const sortedTasks = tasks
      .filter(
        (task) => task.status === 'needsAction' && task.parent === undefined
      )
      .sort((a, b) => parseInt(a.position) - parseInt(b.position))

    return sortedTasks
  }, [taskListId, token])

  const createTaskWithSearchResult = useCallback(
    async (id: number) => {
      const response = await getMovieData(id, 'watch/providers')
      const title = response.title
      let notes: string = ''
      response['watch/providers']?.results?.JP?.flatrate?.forEach(
        (provider) => {
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
        }
      )
      notes = notes.concat(`${response.runtime}分`)

      await createTask({ taskListId, title, notes }, token)
    },
    [taskListId, token]
  )

  const completeTask = useCallback(
    async (taskId: string) => {
      await updateTask({ taskListId, taskId, status: 'completed' }, token)
    },
    [taskListId, token]
  )

  const updateTaskDue = useCallback(
    async (taskId: string, due: string = '') => {
      await updateTask({ taskListId, taskId, due }, token)
    },
    [taskListId, token]
  )

  const deleteOneTask = useCallback(
    async (taskId: string) => {
      await deleteTask({ taskListId, taskId }, token)
    },
    [taskListId, token]
  )

  return {
    fetchAllTasks,
    createTaskWithSearchResult,
    completeTask,
    updateTaskDue,
    deleteOneTask,
  }
}
