import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../components";
import { Calendar } from "react-big-calendar";

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getMessages, localizer } from "../../helpers";
import { useEffect, useState } from "react";
import { useCalendarStore, useUiStore } from "../../hooks";
import { useSelector } from "react-redux";


export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lasView') || 'week');
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { user } = useSelector( state => state.auth);

  const eventStyleGetter = (event, start, end, isSelected) => {
    
    const myEvent = (event.user._id === user.uid) || (event.user.uid === user.uid);
    const style = {
      backgroundColor: myEvent ? '#347CF7' : '#465660',
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

  useEffect(() => {
    startLoadingEvents();
  }, []);

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
