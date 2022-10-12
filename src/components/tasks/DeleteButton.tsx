import { DeleteIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'

const DeleteButton = ({
  taskId,
  onClick,
}: {
  taskId: string
  onClick: (taskId: string) => void
}) => {
  return (
    <IconButton
      variant="outline"
      colorScheme="gray"
      icon={<DeleteIcon />}
      aria-label="Delete Button"
      onClick={() => {
        onClick(taskId)
      }}
    />
  )
}

export default DeleteButton
