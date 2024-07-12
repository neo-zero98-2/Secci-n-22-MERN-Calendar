import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map( item => {
        if(item.id === payload.id){
          return payload;
        }
        return item;
      })
    },
    onDeleteEvent: (state) => {
      state.events = state.events.filter( item => item.id !== state.activeEvent.id);
      state.activeEvent = null;
    },
    // * añade eventos solo si no existen
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      payload.forEach( item => {
        const hasExist = state.events.some( dbEvent => dbEvent.id === item.id );
        if(!hasExist){
          state.events.push(item);
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.activeEvent = null;
      state.events = [];
      state.isLoadingEvents = true;
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  onAddNewEvent, 
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent
} = calendarSlice.actions

export default calendarSlice.reducer