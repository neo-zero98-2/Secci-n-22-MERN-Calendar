import { Navbar } from "../components";
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { addHours } from "date-fns";
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const events = [{
  title: 'Cumpleaños',
  notes: 'Hay que comprar pastel',
  start: new Date(),
  end: addHours(new Date(),1),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Caleb'
  }
}];

export const CalendarPage = () => {


  return (
    <>
      <Navbar />
 
      <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 80px)'}}
        />
      </div>

    </>
  )
}
