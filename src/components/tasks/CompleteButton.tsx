import { IconButton } from '@chakra-ui/react'
import { FiCircle } from 'react-icons/fi'
import { useCompleteTask } from 'src/hooks/tasks/useCompleteTask'

const CompleteButton = ({ taskId }: { taskId: string }) => {
  const { mutate: completeTask } = useCompleteTask()

  return (
    <IconButton
      icon={<FiCircle />}
      aria-label="Check Task Button"
      onClick={() => {
        completeTask(taskId)
      }}
      variant="outline"
      border="none"
      borderRadius={50}
      data-testid="complete-button"
    />
  )
}

export default CompleteButton
