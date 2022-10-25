import { DeleteIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import { useDeleteTask } from 'src/hooks/tasks/useDeleteTask'

const DeleteButton = ({ taskId }: { taskId: string }) => {
  const { mutate: deleteTask } = useDeleteTask()

  return (
    <IconButton
      variant="outline"
      colorScheme="gray"
      icon={<DeleteIcon />}
      aria-label="Delete Button"
      onClick={() => {
        deleteTask(taskId)
      }}
      data-testid="delete-button"
    />
  )
}

export default DeleteButton
