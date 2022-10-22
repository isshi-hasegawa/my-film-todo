import { AddIcon } from '@chakra-ui/icons'
import { Button, Center, Text } from '@chakra-ui/react'
import { useTaskLists } from 'src/hooks/useTaskLists'

const AddListButton = () => {
  const { createTaskListMutate } = useTaskLists()

  return (
    <Button
      data-testid="add-list-button"
      size="sm"
      leftIcon={<AddIcon />}
      aria-label="Add List Button"
      onClick={() => createTaskListMutate()}
      colorScheme="black"
      _hover={{
        textDecoration: 'none',
        bg: 'gray.500',
      }}
    >
      <Center>
        <Text>新しいリストを追加する</Text>
      </Center>
    </Button>
  )
}

export default AddListButton
