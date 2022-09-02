import {
  HStack,
  IconButton,
  Spacer,
  StackDivider,
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
  return (
    <VStack {...vStackProps}>
      {todos.map((todo) => (
        <HStack key={todo.id}>
          <Spacer />
          <IconButton {...buttonProps} />
        </HStack>
      ))}
    </VStack>
  );
};
