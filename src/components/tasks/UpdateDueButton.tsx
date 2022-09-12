import { CalendarIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import ja from 'date-fns/locale/ja'
import 'react-datepicker/dist/react-datepicker.css'
import { format, parse } from 'date-fns'
import formatRFC3339 from 'date-fns/formatRFC3339'

const UpdateDueButton = () => {
  const today = new Date()
  const [startDate, setStartDate] = useState(new Date())
  const calcDaysPassed = (date1: any, date2: any) =>
    Math.abs(date2 - date1) / (1000 * 60 * 60 * 24)
  const passedDays = Math.round(calcDaysPassed(today, startDate))
  const dateString = '2019-09-18T19:00:52Z'

  const parsed = parse(dateString, "yyyy-MM-dd'T'HH:mm:ssXXX", new Date())
  console.log(typeof parsed === Date.toString())

  return (
    <Button variant="outline" colorScheme="blue" leftIcon={<CalendarIcon />}>
      <DatePicker
        selected={startDate}
        locale={ja}
        onChange={(date: Date) => setStartDate(date)}
        minDate={today}
        dateFormat={passedDays === 0 ? '今日' : `${passedDays}日後`}
      />
    </Button>
  )
}

export default UpdateDueButton
