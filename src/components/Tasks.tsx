import {
  HStack,
  IconButton,
  Spacer,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { FaRegCircle, FaTrash } from 'react-icons/fa'
import { deleteTask, getTasks } from 'src/api/tasksApi'
import { Task } from 'src/types/tasks'

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
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    ;(async () => {
      const firstCalledResponse = await getTasks(
        {
          taskListId,
        },
        token
      )

      let tmpTasks: Task[] = firstCalledResponse.items
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
        tmpTasks = [...tmpTasks, ...response.items]
        if (response.nextPageToken?.length) {
          nextPageToken = response.nextPageToken
        } else {
          nextPageToken = ''
        }
      }
      const uncompletedTasks = tmpTasks
        .filter(
          (task) => task.status === 'needsAction' && task.parent === undefined
        )
        .sort((a, b) => parseInt(a.position) - parseInt(b.position))
      setTasks(uncompletedTasks)
    })()
  }, [taskListId, tasks, token])

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

  return (
    <VStack {...vStackProps}>
      {tasks.map((task) => (
        <HStack key={task.id}>
          <IconButton
            bgColor="white"
            icon={<FaRegCircle />}
            aria-label="Check Button"
          />
          <Text>{task.title}</Text>
          <Spacer />
          <IconButton
            bgColor="white"
            icon={
              <FaTrash
                onClick={() => {
                  handleDeleteTask(task.id)
                }}
              />
            }
            aria-label="Delete Button"
          />
        </HStack>
      ))}
    </VStack>
  )
}

export default Tasks
