import reducer, { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from '../../../src/store/calendar/calendarSlice';
import { calendarWithActiveEventState, calendarWithEventState, events, initialState } from '../../fixtures/calendarStates';

describe('pruebas del calendarState', () => {
    test('Debe mostrar el estado inicial', () => {
        const state = calendarSlice.getInitialState();
        expect(state).toEqual(initialState);
    });

    test('onSetActiveEvent debe de activar el evento', () => {
        const state = reducer(calendarWithEventState, onSetActiveEvent(events[0]));
        expect(state.activeEvent).toEqual(events[0]);
    });

    test('onAddNewEvent debe agregar el evento', () => {
        const newEvent = {
            title: 'testing',
            notes: 'testing',
            start: '2024-07-12T06:52:55.248Z',
            end: '2024-07-12T07:52:55.248Z',
            id: '1'
        }
        const state = reducer(calendarWithEventState, onAddNewEvent(newEvent));
        expect(state.events).toEqual([...events, newEvent]);
    });

    test('onUpdateEvent debe actualizar el evento', () => {
        const updateEvent = {
            title: 'testing',
            notes: 'testing',
            start: '2024-07-12T06:52:55.248Z',
            end: '2024-07-12T07:52:55.248Z',
            id: '6690d2d03ba0526893c3e4ca'
        }
        const state = reducer(calendarWithEventState, onUpdateEvent(updateEvent));
        expect(state.events).toContain(updateEvent);
    });

    test('onDeleteEvent debe de borrar el evento activo', () => {
        const activeEvent = events[0];
        const state = reducer(calendarWithActiveEventState, onDeleteEvent());
        expect(state.activeEvent).toBe(null);
        expect(state.events).not.toContain(activeEvent);
    });

    test('onLoadEvents debe de establecer los eventos', () => {
        const state = reducer(initialState, onLoadEvents(events));
        expect(state.events).toEqual(events);
        const newState = reducer(state, onLoadEvents(events));
        expect(newState.events.length).toEqual(events.length);
    });

    test('onLogoutCalendar debe de limpiar el estado', () => {
        const state = reducer(calendarWithActiveEventState, onLogoutCalendar());
        expect(state).toEqual(initialState);
    })


})