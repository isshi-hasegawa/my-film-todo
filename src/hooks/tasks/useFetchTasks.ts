import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { getTasks } from 'src/api/tasksApi'
import { Task } from 'src/types/tasks'

import { useTaskListIdState } from '../useTaskListIdState'

export const useFetchTasks = () => {
  const { data: session } = useSession()
  const token = session?.accessToken as string
  const { taskListId } = useTaskListIdState()

  const fetchAllTasks = async () => {
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
  }

  return useQuery<Task[], Error>(['tasks', taskListId], fetchAllTasks)
}
