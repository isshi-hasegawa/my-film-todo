import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { createTaskList, getTaskLists } from 'src/api/taskListsApi'
import { useCustomToast } from 'src/hooks/useCustomToast'
import { useTaskListIdState } from 'src/hooks/useTaskListIdState'
import { TaskList } from 'src/types/taskLists'

export const useTaskLists = () => {
  const { data: session } = useSession()
  const token = session?.accessToken as string
  const { setTaskListId } = useTaskListIdState()
  const customToast = useCustomToast()

  const fetchTaskLists = async () => {
    const response = await getTaskLists(undefined, token)
    setTaskListId(response[0].id)
    return response
  }

  const { data: taskLists, isFetching } = useQuery<TaskList[]>(
    ['taskLists'],
    fetchTaskLists
  )

  const queryClient = useQueryClient()

  const { mutate: createTaskListMutate } = useMutation(
    () => createTaskList({ title: '新しいリスト' }, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['taskLists'])
        customToast('新しいリストを登録しました！', 'success')
      },
      onError: () => customToast('新しいリストの登録に失敗しました…', 'error'),
    }
  )

  return { taskLists, isFetching, createTaskListMutate }
}
