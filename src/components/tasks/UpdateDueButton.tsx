import 'react-datepicker/dist/react-datepicker.css'

import { CalendarIcon } from '@chakra-ui/icons'
import { Button, Text } from '@chakra-ui/react'
import { format, parse } from 'date-fns'
import ja from 'date-fns/locale/ja'
import DatePicker from 'react-datepicker'
import { useUpdateTaskDue } from 'src/hooks/tasks/useUpdateTaskDue'

const UpdateDueButton = ({ taskId, due }: { taskId: string; due: string }) => {
  const { mutate: updateTask } = useUpdateTaskDue()

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
        updateTask({
          taskId,
          due: `${format(date, 'yyyy-MM-dd')}T00:00:00.000Z`,
        })
      }
      monthsShown={2}
      customInput={
        <Button
          leftIcon={<CalendarIcon />}
          variant="outline"
          colorScheme="black"
          _hover={{ bgColor: 'whiteAlpha.700' }}
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
