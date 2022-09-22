import { AddIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'

const AddListButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <IconButton
      size="sm"
      icon={<AddIcon />}
      aria-label="Add List Button"
      onClick={() => onClick()}
    />
  )
}

export default AddListButton
