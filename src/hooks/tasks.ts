import { useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { getTasks, updateTask, deleteTask } from 'src/api/tasksApi'
import { useTaskListIdState } from 'src/hooks/taskListIdState'
import { Task } from 'src/types/tasks'

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
    deleteOneTask,
  }
}
