import { IconButton } from '@chakra-ui/react'
import { FiCircle } from 'react-icons/fi'
import { useCompleteTask } from 'src/hooks/useCompleteTask'

const CompleteButton = ({ taskId }: { taskId: string }) => {
  const { mutate: completeTask } = useCompleteTask()

  return (
    <IconButton
      bgColor="white"
      icon={<FiCircle />}
      aria-label="Check Task Button"
      onClick={() => {
        completeTask(taskId)
      }}
      data-testid="complete-button"
    />
  )
}

export default CompleteButton
