import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../components";
import { Calendar } from "react-big-calendar";

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getMessages, localizer } from "../../helpers";
import { useState } from "react";
import { useCalendarStore, useUiStore } from "../../hooks";


export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lasView') || 'week');
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    openDateModal();
  }

  const onSelected = (event) => {
    setActiveEvent(event);
  }

  const onViewChanged = (event) => {
    console.log({ onViewChanged: event });
    localStorage.setItem('lastView',event)
  }


  return (
    <>
      <Navbar />
 
      <div>
        <Calendar
          culture="es"
          localizer={localizer}
          defaultView={lastView}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 80px)'}}
          messages={getMessages()}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CalendarEvent
          }}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelected}
          onView={onViewChanged}
        />
      </div>

      <CalendarModal />
      <FabAddNew/>
      <FabDelete/>

    </>
  )
}
