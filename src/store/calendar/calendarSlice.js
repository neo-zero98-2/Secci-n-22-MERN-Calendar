import { createSlice } from '@reduxjs/toolkit'
import { addHours } from "date-fns";

const events = [{
  _id: new Date().getTime(),
  title: 'Cumpleaños',
  notes: 'Hay que comprar pastel',
  start: new Date(),
  end: addHours(new Date(),1),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: ' del jefe Caleb'
  }
}];

const initialState = {
  events,
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
        if(item._id === payload._id){
          return payload;
        }
        return item;
      })
    },
    onDeleteEvent: (state) => {
      state.events = state.events.filter( item => item._id !== state.activeEvent._id);
      state.activeEvent = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  onAddNewEvent, 
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent
} = calendarSlice.actions

export default calendarSlice.reducer