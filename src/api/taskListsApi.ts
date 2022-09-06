import { api } from 'src/utils/api'
import type { TaskList, TaskListsResponse } from 'src/types/taskLists'

type GetTaskListsParams = {
  maxResults?: number
  pageToken?: string
}

export const getTaskLists = async (
  params?: GetTaskListsParams,
  token?: string
): Promise<TaskList[]> => {
  const response = await api.get<TaskListsResponse>(
    'https://tasks.googleapis.com/tasks/v1/users/@me/lists',
    {
      params: {
        ...params,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data.items
}
