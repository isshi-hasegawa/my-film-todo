import { CalendarIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'

const UpdateDueButton = () => {
  return (
    <IconButton
      variant="outline"
      colorScheme="blue"
      icon={<CalendarIcon />}
      aria-label="Update Due Button"
    />
  )
}

export default UpdateDueButton
