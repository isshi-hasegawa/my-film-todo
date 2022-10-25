import { AddIcon } from '@chakra-ui/icons'
import { Button, Center, Text } from '@chakra-ui/react'
import { useCreateTaskList } from 'src/hooks/tasklists/useCreateTaskList'

const AddListButton = () => {
  const { mutate: createTaskList } = useCreateTaskList()

  return (
    <Button
      data-testid="add-list-button"
      size="sm"
      leftIcon={<AddIcon />}
      aria-label="Add List Button"
      onClick={() => createTaskList()}
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
