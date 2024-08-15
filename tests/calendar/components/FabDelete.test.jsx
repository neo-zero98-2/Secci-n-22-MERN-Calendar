import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";

jest.mock('../../../src/hooks/useCalendarStore');

describe('pruebas en <FabDelete/>', () => {
    const mockStartDeletingEvent = jest.fn();
    afterEach(() => jest.restoreAllMocks());
    beforeEach(() => jest.clearAllMocks());

    test('Debe renderizar el <FabDelete/>', () => {
        // jest.fn().mockReturnValue
        useCalendarStore.mockReturnValue({
            hasEventSelected: false
        });

        render(<FabDelete />);

        const btn = screen.getByLabelText('btn-delete');

        console.log(btn.style.display);

        expect(btn.classList).toContain('btn'); // espera a que contenga la clase btn
        expect(btn.classList).toContain('btn-danger'); // espera a que contenga la clase btn-danger
        expect(btn.classList).toContain('fab-danger'); // espera a que contenga la clase fab-danger
        expect(btn.style.display).toBe('none'); // espera a que el style del componente tenga none en display
    });

    test('debe de mostrar el boton si hay un evento activo', () => {
        useCalendarStore.mockReturnValue({
            hasEventSelected: true
        });

        render(<FabDelete />);
        const btn = screen.getByLabelText('btn-delete');
        expect(btn.style.display).toBe('');
    });

    test('debe de llamar startDeletingEvent si hay un evento activo', () => {
        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            startDeletingEvent: mockStartDeletingEvent
        });

        render(<FabDelete />);
        const btn = screen.getByLabelText('btn-delete');
        fireEvent.click(btn);
        expect(mockStartDeletingEvent).toHaveBeenCalled();
    });
});