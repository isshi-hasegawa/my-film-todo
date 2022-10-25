import type { TaskList, TaskListsResponse } from 'src/types/taskLists'
import { api } from 'src/utils/api'

type GetTaskListsParams = {
  maxResults?: number
  pageToken?: string
}

type CreateTaskListParams = {
  title: string
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

export const createTaskList = async (
  params: CreateTaskListParams,
  token?: string
): Promise<TaskList> => {
  const response = await api.post<TaskList>(
    'https://tasks.googleapis.com/tasks/v1/users/@me/lists',
    {
      title: params.title,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    }
  )
  return response.data
}
