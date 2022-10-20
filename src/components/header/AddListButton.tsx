import { AddIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'

const AddListButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <IconButton
      size="sm"
      icon={<AddIcon />}
      aria-label="Add List Button"
      onClick={() => onClick()}
      colorScheme="blackAlpha"
      data-testid="add-list-button"
    />
  )
}

export default AddListButton
