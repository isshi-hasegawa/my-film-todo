import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { getTaskLists } from 'src/api/taskListsApi'
import { useTaskListIdState } from 'src/hooks/useTaskListIdState'
import { TaskList } from 'src/types/taskLists'

export const useFetchTaskLists = () => {
  const { data: session } = useSession()
  const token = session?.accessToken as string
  const { setTaskListId } = useTaskListIdState()

  const fetchTaskLists = async () => {
    const response = await getTaskLists(undefined, token)
    setTaskListId(response[0].id)
    return response
  }

  return useQuery<TaskList[], Error>(['taskLists'], fetchTaskLists)
}
