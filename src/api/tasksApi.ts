import { api } from "src/utils/api";
import type { Task, TasksResponse } from "src/types/tasks";

export type GetTasksParams = {
  taskListId: string;
};

export const getTasks = async (
  params: GetTasksParams,
  token: string
): Promise<Task[]> => {
  const response = await api.get<TasksResponse>(
    `https://tasks.googleapis.com/tasks/v1/lists/${params.taskListId}/tasks?showCompleted=true&showHidden=true`,
    {
      params: {
        ...params,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.items;
};
