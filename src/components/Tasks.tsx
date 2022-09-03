import {
  HStack,
  IconButton,
  Spacer,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { getTasks } from "src/api/tasksApi";
import { Task } from "src/types/tasks";

type Props = {
  selectedTaskListId: string;
};

const vStackProps = {
  p: "4",
  w: "100%",
  maxW: { base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" },
  borderColor: "gray.100",
  borderWidth: "2px",
  borderRadius: "lg",
  alignItems: "stretch",
  divider: <StackDivider />,
};

const buttonProps = {
  icon: <FaTrash />,
  isRound: true,
  "aria-label": "delete",
};

const todos = [{ id: 1 }, { id: 2 }];

export const Tasks = ({ selectedTaskListId }: Props) => {
  const { data: session } = useSession();
  const token = session?.accessToken as string;
  const [tasks, setTasks] = useState<Task[]>([]);
  // const [nextPageToken, setNextPageToken] = useState<string>("");

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getTasks(
        { taskListId: selectedTaskListId },
        token
      );
      const uncompletedTasks = response.items
        .filter((task) => task.status === "needsAction")
        .filter((task) => task.parent === undefined)
        .sort((a, b) => parseInt(a.position) - parseInt(b.position));
      setTasks(uncompletedTasks);
      // if (response.nextPageToken) {
      //   setNextPageToken(response.nextPageToken);
      // }
    };
    fetchTasks();
  }, [selectedTaskListId, token]);

  return (
    <VStack {...vStackProps}>
      {tasks.map((task) => (
        <HStack key={task.id}>
          <Text>{task.title}</Text>
          <Spacer />
          <IconButton {...buttonProps} />
        </HStack>
      ))}
      {/* <HStack>
        <Text>さらに読み込む</Text>
      </HStack> */}
    </VStack>
  );
};
