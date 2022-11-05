import 'react-datepicker/dist/react-datepicker.css'

import { CalendarIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import { format } from 'date-fns'
import ja from 'date-fns/locale/ja'
import DatePicker from 'react-datepicker'
import { useUpdateTaskDue } from 'src/hooks/tasks/useUpdateTaskDue'

const AddDueButton = ({ taskId }: { taskId: string }) => {
  const { mutate: updateTask } = useUpdateTaskDue()

  return (
    <DatePicker
      data-testid="date-picker"
      locale={ja}
      onChange={(date: Date) =>
        updateTask({
          taskId,
          due: `${format(date, 'yyyy-MM-dd')}T00:00:00+00:00`,
        })
      }
      monthsShown={2}
      customInput={
        <IconButton
          icon={<CalendarIcon />}
          variant="outline"
          colorScheme="black"
          aria-label="Add Due Button"
          data-testid="add-due-button"
        />
      }
    />
  )
}

export default AddDueButton
