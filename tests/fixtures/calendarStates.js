export const events = [
    {
        title: 'cita con el dentista',
        notes: 'hay que ir con el dentista perros',
        start: '2024-07-18T17:00:00.000Z',
        end: '2024-07-18T18:00:00.000Z',
        id: '6690c2c60fe388afc94350c2'
    },
    {
        title: 'Viaje',
        notes: 'Salida a cancun',
        start: '2024-07-12T06:39:43.367Z',
        end: '2024-07-12T07:39:43.367Z',
        id: '6690cfb83ba0526893c3e497'
    },
    {
        title: 'cumpleaños',
        notes: 'festejar cumpleaños de caleb',
        start: '2024-07-12T06:52:55.248Z',
        end: '2024-07-12T07:52:55.248Z',
        id: '6690d2d03ba0526893c3e4ca'
    }
];

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}

export const calendarWithEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null
}

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: { ...events[0] }
}

