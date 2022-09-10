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
import { useSession } from 'next-auth/react'
import { FaRegCircle, FaTrash } from 'react-icons/fa'
import { deleteTask, getTasks } from 'src/api/tasksApi'
import { Task } from 'src/types/tasks'
import { useQuery } from '@tanstack/react-query'

type Props = {
  taskListId: string
}

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

const Tasks = ({ taskListId }: Props) => {
  const { data: session } = useSession()
  const token = session?.accessToken as string

  const fetchTasks = async () => {
    const firstCalledResponse = await getTasks(
      {
        taskListId,
      },
      token
    )

    let tasks: Task[] = firstCalledResponse.items
    for (
      let nextPageToken = firstCalledResponse.nextPageToken;
      nextPageToken?.length;

    ) {
      const response = await getTasks(
        {
          taskListId,
          nextPageToken,
        },
        token
      )
      tasks = [...tasks, ...response.items]
      if (response.nextPageToken?.length) {
        nextPageToken = response.nextPageToken
      } else {
        nextPageToken = ''
      }
    }
    return tasks
      .filter(
        (task) => task.status === 'needsAction' && task.parent === undefined
      )
      .sort((a, b) => parseInt(a.position) - parseInt(b.position))
  }

  const handleDeleteTask = (taskId: string) => {
    ;(async () => {
      await deleteTask(
        {
          taskListId,
          taskId,
        },
        token
      )
    })()
  }

  const { data: tasks, isFetching } = useQuery<Task[]>(
    ['tasks', taskListId],
    fetchTasks
  )

  if (isFetching) return <Spinner size="xl" />

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
                  handleDeleteTask(task.id)
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
