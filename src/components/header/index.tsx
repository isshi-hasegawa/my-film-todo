import Link from 'next/link'
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
  Image,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { signOut, useSession } from 'next-auth/react'
import AddListButton from 'src/components/header/AddListButton'
import TaskListLink from 'src/components/header/TaskListLink'
import { useTaskLists } from 'src/hooks/useTaskLists'

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: session } = useSession()

  const { taskLists, isFetching } = useTaskLists()

  return (
    <Box bgColor="black" px={4} position="fixed" w="100%" zIndex={1}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          data-testid="hamburger-icon-button"
          size={'md'}
          icon={
            isOpen ? (
              <CloseIcon />
            ) : (
              <HamburgerIcon data-testid="hamburger-icon" />
            )
          }
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          colorScheme="blackAlpha"
        />
        <HStack spacing={8} alignItems={'center'}>
          <Link href="/">
            <a>
              <Image
                src="/logo.png"
                alt="logo"
                htmlWidth={250}
                htmlHeight={40}
              />
            </a>
          </Link>

          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {isFetching ? (
              <Spinner color="white" />
            ) : (
              taskLists?.map((taskList) => (
                <TaskListLink key={taskList.id} id={taskList.id}>
                  {taskList.title}
                </TaskListLink>
              ))
            )}
            <AddListButton />
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
              <MenuItem data-testid="signout-button" onClick={() => signOut()}>
                ログアウト
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {isFetching ? (
              <Spinner color="white" />
            ) : (
              taskLists?.map((taskList) => (
                <TaskListLink key={taskList.id} id={taskList.id}>
                  {taskList.title}
                </TaskListLink>
              ))
            )}
            <AddListButton />
          </Stack>
        </Box>
      ) : null}
    </Box>
  )
}

export default Header
