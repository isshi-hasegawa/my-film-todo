import { DeleteIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'

const DeleteButton = ({
  onClick,
  taskId,
}: {
  onClick: (taskId: string) => void
  taskId: string
}) => {
  return (
    <IconButton
      variant="outline"
      colorScheme="red"
      icon={<DeleteIcon />}
      aria-label="Delete Button"
      onClick={() => {
        onClick(taskId)
      }}
    />
  )
}

export default DeleteButton
