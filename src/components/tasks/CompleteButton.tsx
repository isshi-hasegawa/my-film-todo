import { CheckCircleIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'

const CompleteButton = ({
  taskId,
  onClick,
}: {
  taskId: string
  onClick: (taskId: string) => void
}) => {
  return (
    <IconButton
      bgColor="white"
      icon={<CheckCircleIcon />}
      aria-label="Check Task Button"
      onClick={() => {
        onClick(taskId)
      }}
    />
  )
}

export default CompleteButton
