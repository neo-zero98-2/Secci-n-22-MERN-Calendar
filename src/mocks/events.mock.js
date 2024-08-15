import { http, HttpResponse } from 'msw'

export const Events = [
    http.get('http://localhost:4000/api/events', () => {
        // ...and respond to them using this JSON response.
        return HttpResponse.json({
            ok: true,
            eventos: [
                {
                    title: "cita con el dentista",
                    notes: "hay que ir con el dentista perros",
                    start: "2024-07-18T17:00:00.000Z",
                    end: "2024-07-18T18:00:00.000Z",
                    user: {
                        _id: "6690beb60fe388afc94350a1",
                        name: "caleb"
                    },
                    id: "6690c2c60fe388afc94350c2"
                },
                {
                    title: "titulo",
                    notes: "prueba",
                    start: "2024-07-12T06:39:43.367Z",
                    end: "2024-07-12T07:39:43.367Z",
                    user: {
                        _id: "668cce1049c52f51f07e5349",
                        name: "david"
                    },
                    id: "6690cfb83ba0526893c3e497"
                },
                {
                    title: "aaaaaaaaa",
                    notes: "aaaaaaaaa",
                    start: "2024-07-12T06:52:55.248Z",
                    end: "2024-07-12T07:52:55.248Z",
                    user: {
                        _id: "668cce1049c52f51f07e5349",
                        name: "david"
                    },
                    id: "6690d2d03ba0526893c3e4ca"
                },
                {
                    title: "pruebas test",
                    notes: "prueba test",
                    start: "2024-08-06T04:46:48.513Z",
                    end: "2024-08-06T05:46:48.513Z",
                    user: {
                        _id: "66988f44c7ff70013fbd6ae1",
                        name: "test"
                    },
                    id: "66b1aac44eda3e3cc91fc2c9"
                }
            ]
        }, { status: 200 })
    }),

    
]