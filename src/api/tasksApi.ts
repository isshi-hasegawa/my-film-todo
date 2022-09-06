import { api } from 'src/utils/api'
import type { TasksResponse, GetTasksResponse } from 'src/types/tasks'

export type GetTasksParams = {
  taskListId: string
}

export type GetTasksNextPageParams = {
  taskListId: string
  nextPageToken?: string
}

export const getTasks = async (
  params: GetTasksParams,
  token: string
): Promise<GetTasksResponse> => {
  const response = await api.get<TasksResponse>(
    `https://tasks.googleapis.com/tasks/v1/lists/${params.taskListId}/tasks?maxResults=100`,
    {
      params: {
        ...params,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return {
    items: response.data.items,
    nextPageToken: response.data.nextPageToken,
  }
}

// export const getTasksNextPage = async (
//   params: GetTasksNextPageParams,
//   token: string
// ) => {
//   const response = await api.get<TasksResponse>(
//     `https://tasks.googleapis.com/tasks/v1/lists/${params.taskListId}/tasks?maxResults=100?pageToken=${params.nextPageToken}`,
//     {
//       params: {
//         ...params,
//       },
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return response;
// };
