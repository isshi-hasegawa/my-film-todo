import { DeleteIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import React from 'react'
import { useDeleteTask } from 'src/hooks/tasks/useDeleteTask'

const DeleteButton = ({ taskId }: { taskId: string }) => {
  const { mutate: deleteTask } = useDeleteTask()

  return (
    <IconButton
      icon={<DeleteIcon />}
      variant="outline"
      aria-label="Delete Button"
      onClick={() => {
        deleteTask(taskId)
      }}
      border="none"
      borderRadius={50}
      data-testid="delete-button"
    />
  )
}

export default DeleteButton
