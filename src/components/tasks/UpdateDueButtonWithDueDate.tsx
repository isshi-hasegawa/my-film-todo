import { CalendarIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import { ReactNode } from 'react'

const UpdateDueButton = ({ children }: { children: ReactNode }) => {
  return (
    <Button variant="outline" colorScheme="blue" leftIcon={<CalendarIcon />}>
      {children}
    </Button>
  )
}

export default UpdateDueButton
