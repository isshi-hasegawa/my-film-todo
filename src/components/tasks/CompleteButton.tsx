import { CheckCircleIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'

const CompleteButton = ({
  onClick,
  taskId,
}: {
  onClick: (taskId: string) => void
  taskId: string
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