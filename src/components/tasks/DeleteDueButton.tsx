import { CloseIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import { useUpdateTaskDue } from 'src/hooks/tasks/useUpdateTaskDue'

const DeleteDueButton = ({ taskId }: { taskId: string }) => {
  const { mutate: updateTask } = useUpdateTaskDue()

  return (
    <IconButton
      backgroundColor="white"
      aria-label="Delete Due Button"
      icon={<CloseIcon color="gray" />}
      onClick={() => updateTask({ taskId })}
    />
  )
}

export default DeleteDueButton
