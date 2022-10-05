import { IconButton } from '@chakra-ui/react'
import { FiCircle } from 'react-icons/fi'

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
      icon={<FiCircle />}
      aria-label="Check Task Button"
      onClick={() => {
        onClick(taskId)
      }}
    />
  )
}

export default CompleteButton
