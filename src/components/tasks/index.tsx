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
  const { fetchAllTasks, completeTask, deleteOneTask } = useTasks()

  const { data: tasks, isFetching } = useQuery<Task[]>(
    ['tasks', taskListId],
    fetchAllTasks
  )

  const queryClient = useQueryClient()
  const { mutate: deleteTaskMutate } = useMutation(
    (taskId: string) => deleteOneTask(taskId),
    { onSuccess: () => queryClient.invalidateQueries(['tasks']) }
  )
  const { mutate: completeTaskMutate } = useMutation(
    (taskId: string) => completeTask(taskId),
    { onSuccess: () => queryClient.invalidateQueries(['tasks']) }
  )

  if (isFetching) return <Spinner size="xl" />

  return (
    <VStack {...vStackProps}>
      {tasks?.map((task) => (
        <HStack key={task.id}>
          <CompleteButton onClick={completeTaskMutate} taskId={task.id} />
          <Stack>
            <Text>{task.title}</Text>
            <Text fontSize="sm" color="gray.600">
              {task.notes}
            </Text>
            <HStack display={{ md: 'none' }}>
              <UpdateDueButton />
              <DeleteButton onClick={deleteTaskMutate} taskId={task.id} />
            </HStack>
          </Stack>
          <Spacer />
          <HStack display={{ base: 'none', sm: 'none', md: 'flex' }}>
            <UpdateDueButton />
            <DeleteButton onClick={deleteTaskMutate} taskId={task.id} />
          </HStack>
        </HStack>
      ))}
    </VStack>
  )
}

export default Tasks
