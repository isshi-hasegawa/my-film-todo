import {
  Alert,
  AlertDescription,
  AlertIcon,
  HStack,
  Spacer,
  Spinner,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useFetchTasks } from 'src/hooks/tasks/useFetchTasks'
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
  const { data: tasks, isError, isFetching } = useFetchTasks()

  return (
    <>
      <SearchScreenSwitchButton />

      {!tasks?.length ? (
        <Text data-testid="message-tasks-zero">まだ作品の登録がありません</Text>
      ) : isError ? (
        <Alert status="error" placeItems="center">
          <AlertIcon />
          <AlertDescription>データの取得に失敗しました…</AlertDescription>
        </Alert>
      ) : isFetching ? (
        <Spinner size="xl" placeItems="center" />
      ) : (
        <VStack {...vStackProps} data-testid="tasks">
          {tasks?.map((task) => (
            <HStack key={task.id}>
              <CompleteButton taskId={task.id} />
              <Stack>
                <Text data-testid="task-title">{task.title}</Text>
                <Text fontSize="sm" color="gray.600" data-testid="task-notes">
                  {task.notes}
                </Text>
                <HStack display={{ md: 'none' }}>
                  {!task.due ? (
                    <AddDueButton taskId={task.id} />
                  ) : (
                    <>
                      <UpdateDueButton taskId={task.id} due={task.due} />
                      <DeleteDueButton taskId={task.id} />
                    </>
                  )}
                  <Spacer />
                </HStack>
              </Stack>
              <Spacer />
              <HStack display={{ base: 'none', sm: 'none', md: 'flex' }}>
                {!task.due ? (
                  <AddDueButton taskId={task.id} />
                ) : (
                  <>
                    <UpdateDueButton taskId={task.id} due={task.due} />
                    <DeleteDueButton taskId={task.id} />
                  </>
                )}
              </HStack>
              <DeleteButton taskId={task.id} />
            </HStack>
          ))}
        </VStack>
      )}
    </>
  )
}

export default Tasks
