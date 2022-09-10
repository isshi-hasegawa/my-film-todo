import { useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { getTasks, createTask, updateTask, deleteTask } from 'src/api/tasksApi'
import { useTaskListIdState } from 'src/hooks/taskListIdState'
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
    } while ((nextPageToken = ''))

    return tasks
      .filter(
        (task) => task.status === 'needsAction' && task.parent === undefined
      )
      .sort((a, b) => parseInt(a.position) - parseInt(b.position))
  }, [taskListId, token])

  const createTaskWithMovieInfo = useCallback(
    async (id: number) => {
      const response = await getMovieData(id, 'watch/providers')
      const title = response.title
      let notes: string = ''
      response['watch/providers']?.results?.JP?.flatrate?.map((provider) => {
        if (provider.provider_name === 'Netflix')
          notes = notes.concat('Netflix', ' ')
        if (provider.provider_name === 'Amazon Prime Video')
          notes = notes.concat('Amazon Prime Video', ' ')
        if (provider.provider_name === 'Disney Plus')
          notes = notes.concat('Disney+', ' ')
      })
      notes = notes.concat(`${response.runtime}分`)

      await createTask(
        {
          taskListId,
          title,
          notes,
        },
        token
      )
    },
    [taskListId, token]
  )

  const completeTask = useCallback(
    async (taskId: string) => {
      await updateTask({ taskListId, taskId, status: 'completed' }, token)
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
    createTaskWithMovieInfo,
    deleteOneTask,
  }
}
