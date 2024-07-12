import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { 
        events,
        activeEvent
    } = useSelector(state => state.calendar);

    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => 
        dispatch(onSetActiveEvent(calendarEvent));
    
    const startSavingEvent = async(calendarEvent) => {
        console.log("calendarEvent ", calendarEvent);

        try {
            if(calendarEvent.id){
                // * actualiza
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;
            }
            // * creado
            const { data } = await calendarApi.post('/events', calendarEvent );
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user}));
        } catch (error) {
            console.error(error);
            if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK'){
                Swal.fire('Error', 'timeout', 'error');
                return;
            }
            const { response: { data } } = error;
            Swal.fire('Error al guardar', data.msg[0].msg || data.msg, 'error');
        }
    }

    const startDeletingEvent = async() => {
        // TODO: llegar al backend
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent());
        } catch (error) {
            console.error(error);
            if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK'){
                Swal.fire('Error', 'timeout', 'error');
                return;
            }
            const { response: { data } } = error;
            Swal.fire('Error al guardar', data.msg[0].msg || data.msg, 'error');
        }
    }

    // startLoadingEvents
    const startLoadingEvents = async() => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.eventos);
            dispatch(onLoadEvents(events));
        } catch (error) {
            console.error(error);
            if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK'){
                Swal.fire('Error', 'timeout', 'error');
                return;
            }
            const { response: { data } } = error;
            Swal.fire('Error al guardar', data.msg[0].msg || data.msg, 'error');
        }
    }

    return {
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,
        setActiveEvent,
        startDeletingEvent,
        startSavingEvent,
        startLoadingEvents
    } 
}
