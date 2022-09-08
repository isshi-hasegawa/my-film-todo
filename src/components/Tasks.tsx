import { HStack, StackDivider, Text, VStack } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa'
import { getTasks } from 'src/api/tasksApi'
import { Task } from 'src/types/tasks'
import { IconButton } from '@chakra-ui/react'

type Props = {
  selectedTaskListId: string
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

const Tasks = ({ selectedTaskListId }: Props) => {
  const { data: session } = useSession()
  const token = session?.accessToken as string
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      const firstCalledResponse = await getTasks(
        {
          taskListId: selectedTaskListId,
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
            taskListId: selectedTaskListId,
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
    }
    fetchTasks()
  }, [selectedTaskListId, tasks, token])

  return (
    <VStack {...vStackProps}>
      {tasks.map((task) => (
        <HStack key={task.id}>
          <FaRegCircle />
          <Text>{task.title}</Text>
        </HStack>
      ))}
    </VStack>
  )
}

export default Tasks
