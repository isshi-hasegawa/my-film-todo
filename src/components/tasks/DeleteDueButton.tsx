import { CloseIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'

const DeleteDueButton = ({
  taskId,
  onClick,
}: {
  taskId: string
  onClick: ({ taskId, due }: { taskId: string; due?: string }) => void
}) => {
  return (
    <IconButton
      backgroundColor="white"
      aria-label="Delete Due Button"
      icon={<CloseIcon color="gray" />}
      onClick={() => onClick({ taskId })}
    />
  )
}

export default DeleteDueButton
