import { Button } from '@chakra-ui/react'
import { useUpdateTaskDue } from 'src/hooks/tasks/useUpdateTaskDue'

const DeleteDueButton = ({ taskId }: { taskId: string }) => {
  const { mutate: updateTask } = useUpdateTaskDue()

  return (
    <Button
      aria-label="Delete Due Button"
      onClick={() => updateTask({ taskId, due: '' })}
      variant="outline"
      border="none"
      _hover={{ bgColor: 'whiteAlpha.700' }}
    >
      期限を削除
    </Button>
  )
}

export default DeleteDueButton
