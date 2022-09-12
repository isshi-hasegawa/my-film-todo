import {
  Heading,
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
import { useTaskListIdState } from 'src/hooks/taskListIdState'
import { useTasks } from 'src/hooks/tasks'
import CompleteButton from 'src/components/tasks/CompleteButton'
import UpdateDueButton from 'src/components/tasks/UpdateDueButton'
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

  const { data: tasks, isFetching } = useQuery<Task[]>(
    ['tasks', taskListId],
    fetchAllTasks
  )

  const queryClient = useQueryClient()
  const { mutate: completeTaskMutate } = useMutation(
    (taskId: string) => completeTask(taskId),
    { onSuccess: () => queryClient.invalidateQueries(['tasks']) }
  )
  const { mutate: updateTaskDueMutate } = useMutation(
    ({ taskId, due }: { taskId: string; due?: string }) =>
      updateTaskDue(taskId, due),
    { onSuccess: () => queryClient.invalidateQueries(['tasks']) }
  )
  const { mutate: deleteTaskMutate } = useMutation(
    (taskId: string) => deleteOneTask(taskId),
    { onSuccess: () => queryClient.invalidateQueries(['tasks']) }
  )

  if (isFetching) return <Spinner size="xl" />

  return (
    <>
      {!tasks?.length ? (
        <Heading>タスクを登録してください</Heading>
      ) : (
        <VStack {...vStackProps}>
          {tasks?.map((task) => (
            <HStack key={task.id}>
              <CompleteButton taskId={task.id} onClick={completeTaskMutate} />
              <Stack>
                <Text>{task.title}</Text>
                <Text fontSize="sm" color="gray.600">
                  {task.notes}
                </Text>
                <HStack display={{ md: 'none' }}>
                  <UpdateDueButton
                    taskId={task.id}
                    due={task.due}
                    onChange={updateTaskDueMutate}
                  />
                </HStack>
              </Stack>
              <Spacer />
              <HStack display={{ base: 'none', sm: 'none', md: 'flex' }}>
                <UpdateDueButton
                  taskId={task.id}
                  due={task.due}
                  onChange={updateTaskDueMutate}
                />
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
