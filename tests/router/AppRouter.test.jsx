import { fireEvent, render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";
import { MemoryRouter } from "react-router-dom";

jest.mock('../../src/hooks/useAuthStore');
jest.mock('react-modal');

/**
 * Mock de un functional componente para evitarnos de renderizar 
 * el componente con todos sus hooks y dependencias
 * este mock se usa para la prueba "debe de mostrar el calendario si estamos autenticados"
 */
jest.mock('../../src/calendar', () => ({
    CalendarPage: () => <h1>Calendar Page</h1>
}));


describe('Pruebas en <AppRouter />', () => {

    const mockCheckAuthToken = jest.fn(); // por cada mock que se haga se tiene que limpiar los mocks
    beforeEach(() => jest.clearAllMocks()); // limpiar mocks con jest.clearAllMocks()

    test('debe de mostrar la pantalla de carga y llamar checkAuthToken', () => {
        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken
        });

        render(<AppRouter />);
        const carga = screen.getByText(/Cargando/); //obtiene un texto relacionado a Cargando
        expect(mockCheckAuthToken).toHaveBeenCalled();
        expect(carga.textContent).toBe('Cargando...');
    });

    test('debe de mostrar el login en caso de no estar autenticado', () => {
        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken
        });
        const { container } = render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        )
        // screen.debug();

        expect(screen.getByText('Ingreso')).toBeTruthy();
        expect(container).toMatchSnapshot();
    });

    test('debe de mostrar el calendario si estamos autenticados', () => {
        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );

        screen.debug();
        expect(screen.getByText(/Calendar/)).toBeTruthy();
    });

});