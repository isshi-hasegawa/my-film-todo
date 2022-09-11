import { api } from 'src/utils/api'
import type { Task, TasksResponse } from 'src/types/tasks'

export type GetTasksParams = {
  taskListId: string
  nextPageToken?: string
}

type CreateTaskParam = { taskListId: string } & Partial<Task>

type UpdateTaskParams = {
  taskListId: string
  taskId: string
} & Partial<Task>

type DeleteTaskParams = {
  taskListId: string
  taskId: string
}

export const getTasks = async (
  params: GetTasksParams,
  token: string
): Promise<TasksResponse> => {
  const response = await api.get<TasksResponse>(
    `https://tasks.googleapis.com/tasks/v1/lists/${params.taskListId}/tasks?maxResults=100&pageToken=${params.nextPageToken}`,
    // `https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks?maxResults=100${optionalUrl}`,
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
  const { taskListId, ...rest } = params

  const response = await api.post<Task>(
    `https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks`,
    {
      ...rest,
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

export const updateTask = async (
  params: UpdateTaskParams,
  token: string
): Promise<Task> => {
  const { taskListId, taskId, ...rest } = params

  const response = await api.patch<Task>(
    `https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks/${taskId}`,
    {
      ...rest,
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

export const deleteTask = async (
  params: DeleteTaskParams,
  token: string
): Promise<void> => {
  const { taskListId, taskId } = params

  await api.delete<Task>(
    `https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks/${taskId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    }
  )
}
