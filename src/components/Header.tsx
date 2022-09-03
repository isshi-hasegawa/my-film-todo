import { ReactNode, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { signOut, useSession } from "next-auth/react";
import { getTaskLists } from "src/api/taskListsApi";
import { TaskList } from "src/types/taskLists";

const NavLink = ({
  children,
  setSelectedTaskListId,
  taskListId,
  setIsShowSearchMovies,
}: {
  children: ReactNode;
  setSelectedTaskListId: (id: string) => void;
  taskListId: string;
  setIsShowSearchMovies: (boolean: boolean) => void;
}) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    onClick={() => {
      setSelectedTaskListId(taskListId);
      setIsShowSearchMovies(false);
    }}
  >
    {children}
  </Link>
);

type Props = {
  setSelectedTaskListId: (id: string) => void;
  setIsShowSearchMovies: (boolean: boolean) => void;
};

export default function Header({
  setSelectedTaskListId,
  setIsShowSearchMovies,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();
  const token = session?.accessToken as string;
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);

  useEffect(() => {
    const fetchTaskLists = async () => {
      await getTaskLists(undefined, token).then((taskLists) => {
        setTaskLists(taskLists);
        setSelectedTaskListId(taskLists[0].id);
      });
    };
    fetchTaskLists();
  }, [setSelectedTaskListId, token]);

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        position="fixed"
        w="100%"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Logo</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {taskLists.map((taskList) => (
                <NavLink
                  key={taskList.id}
                  setSelectedTaskListId={setSelectedTaskListId}
                  taskListId={taskList.id}
                  setIsShowSearchMovies={setIsShowSearchMovies}
                >
                  {taskList.title}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={session?.user?.image ?? undefined} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => signOut()}>ログアウト</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {taskLists.map((taskList) => (
                <NavLink
                  key={taskList.id}
                  setSelectedTaskListId={setSelectedTaskListId}
                  taskListId={taskList.id}
                  setIsShowSearchMovies={setIsShowSearchMovies}
                >
                  {taskList.title}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
