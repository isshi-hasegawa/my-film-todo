import { CalendarIcon } from '@chakra-ui/icons'
import { Button, IconButton } from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import ja from 'date-fns/locale/ja'
import 'react-datepicker/dist/react-datepicker.css'
import { parse, format } from 'date-fns'

const UpdateDueButton = ({
  taskId,
  due,
  onChange,
}: {
  taskId: string
  due: string | undefined
  onChange: ({ taskId, due }: { taskId: string; due: string }) => void
}) => {
  const today = new Date()
  const parsedDue = due
    ? parse(due.substring(0, 10), 'yyyy-MM-dd', new Date())
    : undefined
  const daysAfter = parsedDue
    ? Math.round(
        (parsedDue?.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      )
    : undefined

  return (
    <DatePicker
      selected={parsedDue}
      locale={ja}
      onChange={(date: Date) => {
        const due = `${format(date, 'yyyy-MM-dd')}T00:00:00+00:00`
        onChange({ taskId, due })
      }}
      minDate={today}
      monthsShown={2}
      customInput={
        due ? (
          <Button
            variant="outline"
            colorScheme="blue"
            leftIcon={<CalendarIcon />}
          >
            {daysAfter === 0 ? '今日' : `${daysAfter}日後`}
          </Button>
        ) : (
          <IconButton
            variant="outline"
            colorScheme="blue"
            icon={<CalendarIcon />}
            aria-label="Update Due Button"
          />
        )
      }
    />
  )
}

export default UpdateDueButton
