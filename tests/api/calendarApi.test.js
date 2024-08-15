import calendarApi from '../../src/api/calendarApi';

describe('pruebas de CalendarApi', () => {
    test('debe de tener la configuracion baseUrl por defecto', () => {
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
    });

    test('debe de tener el header x-token', async() => {
        const token = 'abc-123';
        localStorage.setItem('token', token);
        const peticion = await calendarApi.get('/auth');
        expect(peticion.config.headers['x-token']).toBe(token);
    });

});

