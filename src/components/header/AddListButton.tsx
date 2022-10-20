import { AddIcon } from '@chakra-ui/icons'
import { Button, Center, Text } from '@chakra-ui/react'

const AddListButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      size="sm"
      leftIcon={<AddIcon />}
      aria-label="Add List Button"
      onClick={() => onClick()}
      colorScheme="blackAlpha"
      _hover={{
        textDecoration: 'none',
        bg: 'gray.500',
      }}
      data-testid="add-list-button"
    >
      <Center>
        <Text>新しいリストを追加する</Text>
      </Center>
    </Button>
  )
}

export default AddListButton
