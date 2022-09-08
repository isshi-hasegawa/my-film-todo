export type TaskList = {
  kind: string
  id: string
  etag: string
  title: string
  updated: string
  selfLink: string
}

export type TaskListsResponse = {
  kind: string
  etag: string
  nextPageToken?: string
  items: TaskList[]
}

export type GetTaskListsParams = {
  maxResults?: number
  pageToken?: string
}
