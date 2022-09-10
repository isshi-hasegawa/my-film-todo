import {
  HStack,
  IconButton,
  Spacer,
  Spinner,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FaRegCircle, FaTrash } from 'react-icons/fa'
import { Task } from 'src/types/tasks'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useTaskListIdState } from 'src/hooks/taskListIdState'
import { useTasks } from 'src/hooks/tasks'

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
  const { fetchAllTasks, deleteOneTask } = useTasks()

  const { data: tasks, isFetching } = useQuery<Task[]>(
    ['tasks', taskListId],
    fetchAllTasks
  )

  const queryClient = useQueryClient()
  const { mutate: deleteTaskMutate, isLoading } = useMutation(
    (taskId: string) => deleteOneTask(taskId),
    { onSuccess: () => queryClient.invalidateQueries(['tasks']) }
  )

  if (isFetching || isLoading) return <Spinner size="xl" />

  return (
    <VStack {...vStackProps}>
      {tasks?.map((task) => (
        <HStack key={task.id}>
          <IconButton
            bgColor="white"
            icon={<FaRegCircle />}
            aria-label="Check Task Button"
          />
          <Stack>
            <Text>{task.title}</Text>
            <Text fontSize="sm" color="gray.600">
              {task.notes}
            </Text>
          </Stack>
          <Spacer />
          <IconButton
            variant="outline"
            colorScheme="red"
            bgColor="white"
            icon={
              <FaTrash
                onClick={() => {
                  deleteTaskMutate(task.id)
                }}
              />
            }
            aria-label="Delete Task Button"
          />
        </HStack>
      ))}
    </VStack>
  )
}

export default Tasks
