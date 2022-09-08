import { api } from 'src/utils/api'
import type { Task, TasksResponse } from 'src/types/tasks'

export type GetTasksParams = {
  taskListId: string
  nextPageToken?: string
}

export type CreateTaskParam = { taskListId: string } & Partial<Task>

export const getTasks = async (
  params: GetTasksParams,
  token: string
): Promise<TasksResponse> => {
  if (!params.nextPageToken?.length) {
    params.nextPageToken = ''
  }

  const response = await api.get<TasksResponse>(
    `https://tasks.googleapis.com/tasks/v1/lists/${params.taskListId}/tasks?maxResults=100&pageToken=${params.nextPageToken}`,
    {
      params: {
        ...params,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}

export const createTask = async (
  params: CreateTaskParam,
  token: string
): Promise<Task> => {
  const response = await api.post<Task>(
    `https://tasks.googleapis.com/tasks/v1/lists/${params.taskListId}/tasks`,
    {
      title: params.title,
      notes: params.notes,
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
