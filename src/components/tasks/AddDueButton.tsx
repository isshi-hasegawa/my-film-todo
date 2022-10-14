import { CalendarIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import ja from 'date-fns/locale/ja'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'

const AddDueButton = ({
  taskId,
  onChange,
}: {
  taskId: string
  onChange: ({ taskId, due }: { taskId: string; due?: string }) => void
}) => {
  return (
    <DatePicker
      locale={ja}
      onChange={(date: Date) =>
        onChange({
          taskId,
          due: `${format(date, 'yyyy-MM-dd')}T00:00:00+00:00`,
        })
      }
      monthsShown={2}
      customInput={
        <IconButton
          variant="outline"
          colorScheme="blue"
          icon={<CalendarIcon />}
          aria-label="Add Due Button"
          data-testid="add-due-button"
        />
      }
    />
  )
}

export default AddDueButton
