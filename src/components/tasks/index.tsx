import {
  HStack,
  Spacer,
  Spinner,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Task } from 'src/types/tasks'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useTaskListIdState } from 'src/hooks/useTaskListIdState'
import { useTasks } from 'src/hooks/useTasks'
import { useCustomToast } from 'src/hooks/useCustomToast'
import SearchScreenSwitchButton from 'src/components/tasks/SearchScreenSwitchButton'
import CompleteButton from 'src/components/tasks/CompleteButton'
import AddDueButton from 'src/components/tasks/AddDueButton'
import UpdateDueButton from 'src/components/tasks/UpdateDueButton'
import DeleteDueButton from 'src/components/tasks/DeleteDueButton'
import DeleteButton from 'src/components/tasks/DeleteButton'

const vStackProps = {
  p: '4',
  w: '100%',
  maxW: { base: '100vw', sm: '80vw', lg: '50vw', xl: '40vw' },
  borderColor: 'gray.100',
  borderWidth: '2px',
  borderRadius: 'lg',
  alignItems: 'stretch',
  divider: <StackDivider />,
}

const Tasks = () => {
  const { taskListId } = useTaskListIdState()
  const { fetchAllTasks, completeTask, updateTaskDue, deleteOneTask } =
    useTasks()
  const customToast = useCustomToast()

  const { data: tasks, isFetching } = useQuery<Task[]>(
    ['tasks', taskListId],
    fetchAllTasks
  )

  const queryClient = useQueryClient()
  const { mutate: completeTaskMutate } = useMutation(
    (taskId: string) => completeTask(taskId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks'])
        customToast('タスクを完了しました！', 'success')
      },
      onError: () => customToast('タスクを完了できませんでした…', 'error'),
    }
  )
  const { mutate: updateTaskDueMutate } = useMutation(
    ({ taskId, due }: { taskId: string; due?: string }) =>
      updateTaskDue(taskId, due),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks'])
        customToast('タスクの期限を更新しました！', 'success')
      },
      onError: () =>
        customToast('タスクの期限を更新できませんでした…', 'error'),
    }
  )
  const { mutate: deleteTaskMutate } = useMutation(
    (taskId: string) => deleteOneTask(taskId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks'])
        customToast('タスクを削除しました！', 'success')
      },
      onError: () => customToast('タスクを削除できませんでした…', 'error'),
    }
  )

  return (
    <>
      <SearchScreenSwitchButton />

      {!tasks?.length ? (
        <Text data-testid="message-tasks-zero">まだ作品の登録がありません</Text>
      ) : isFetching ? (
        <Spinner size="xl" placeItems="center" />
      ) : (
        <VStack {...vStackProps} data-testid="tasks">
          {tasks?.map((task) => (
            <HStack key={task.id}>
              <CompleteButton taskId={task.id} onClick={completeTaskMutate} />
              <Stack>
                <Text data-testid="task-title">{task.title}</Text>
                <Text fontSize="sm" color="gray.600" data-testid="task-notes">
                  {task.notes}
                </Text>
                <HStack display={{ md: 'none' }}>
                  {!task.due ? (
                    <AddDueButton
                      taskId={task.id}
                      onChange={updateTaskDueMutate}
                    />
                  ) : (
                    <>
                      <UpdateDueButton
                        taskId={task.id}
                        due={task.due}
                        onChange={updateTaskDueMutate}
                      />
                      <DeleteDueButton
                        taskId={task.id}
                        onClick={updateTaskDueMutate}
                      />
                    </>
                  )}
                  <Spacer />
                </HStack>
              </Stack>
              <Spacer />
              <HStack display={{ base: 'none', sm: 'none', md: 'flex' }}>
                {!task.due ? (
                  <AddDueButton
                    taskId={task.id}
                    onChange={updateTaskDueMutate}
                  />
                ) : (
                  <>
                    <UpdateDueButton
                      taskId={task.id}
                      due={task.due}
                      onChange={updateTaskDueMutate}
                    />
                    <DeleteDueButton
                      taskId={task.id}
                      onClick={updateTaskDueMutate}
                    />
                  </>
                )}
              </HStack>
              <DeleteButton taskId={task.id} onClick={deleteTaskMutate} />
            </HStack>
          ))}
        </VStack>
      )}
    </>
  )
}

export default Tasks
