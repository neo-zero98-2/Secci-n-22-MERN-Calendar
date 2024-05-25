import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './ui/uiSlice';
import calendarReducer from './calendar/calendarSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    calendar: calendarReducer
  },
  
  /*
  * propiedad para eliminar errores de serialización de redux tolkit
  * no es necesario poner las siguientes lineas
  * para más informacion consultar: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data 
  */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['calendar/onSetActiveEvent'],
        ignoredActionPaths: ['payload.start', 'payload.end'],
        ignoredPaths: ['calendar.events', 'calendar.activeEvent']
      }
    })
})