import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack,
  Spinner,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import { signOut, useSession } from 'next-auth/react'
import { createTaskList, getTaskLists } from 'src/api/taskListsApi'
import { TaskList } from 'src/types/taskLists'
import NavLink from 'src/components/NavLink'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { taskListIdState } from 'src/states/taskListIdState'

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: session } = useSession()
  const token = session?.accessToken as string
  const [, setTaskListId] = useRecoilState<string>(taskListIdState)

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

  const { mutate: createTaskListMutate, isLoading } = useMutation(
    () => createTaskList({ title: '新しいリスト' }, token),
    { onSuccess: () => queryClient.invalidateQueries(['taskLists']) }
  )

  return (
    <>
      <Box bgColor="gray.100" px={4} position="fixed" w="100%">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {isFetching || isLoading ? (
                <Spinner size="xl" />
              ) : (
                taskLists?.map((taskList) => (
                  <NavLink key={taskList.id} id={taskList.id}>
                    {taskList.title}
                  </NavLink>
                ))
              )}
              {}

              <IconButton
                size="sm"
                icon={<AddIcon />}
                aria-label="Add List Button"
                onClick={() => {
                  createTaskListMutate()
                }}
              />
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar size={'sm'} src={session?.user?.image ?? undefined} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => signOut()}>ログアウト</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {isFetching || isLoading ? (
                <Spinner size="xl" />
              ) : (
                taskLists?.map((taskList) => (
                  <NavLink key={taskList.id} id={taskList.id}>
                    {taskList.title}
                  </NavLink>
                ))
              )}

              <IconButton
                size="sm"
                icon={<AddIcon />}
                aria-label="Add List Button"
                onClick={() => {
                  createTaskListMutate()
                }}
              />
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}

export default Header
