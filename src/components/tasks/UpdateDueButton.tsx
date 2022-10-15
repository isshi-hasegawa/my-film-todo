import { CalendarIcon } from '@chakra-ui/icons'
import { Button, Text } from '@chakra-ui/react'
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
  due: string
  onChange: ({ taskId, due }: { taskId: string; due?: string }) => void
}) => {
  const today = new Date()
  const dueDate: Date = parse(due.substring(0, 10), 'yyyy-MM-dd', new Date())
  const daysAfter: number = Math.ceil(
    (dueDate?.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <DatePicker
      selected={dueDate}
      locale={ja}
      onChange={(date: Date) =>
        onChange({
          taskId,
          due: `${format(date, 'yyyy-MM-dd')}T00:00:00.000Z`,
        })
      }
      monthsShown={2}
      customInput={
        <Button
          variant="outline"
          colorScheme="blue"
          leftIcon={<CalendarIcon />}
        >
          <div data-testid="days-after"></div>
          {daysAfter < 0 && <Text color="red.400">期限切れ</Text>}
          {daysAfter === 0 && <Text color="red.400">今日</Text>}
          {daysAfter === 1 && '明日'}
          {daysAfter >= 2 && `${daysAfter}日後`}
        </Button>
      }
    />
  )
}

export default UpdateDueButton
