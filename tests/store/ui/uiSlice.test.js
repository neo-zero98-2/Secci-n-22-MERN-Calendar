import reducer, { onOpenDateModal, uiSlice, onCloseDateModal } from '../../../src/store/ui/uiSlice';
import { initialState } from '../../fixtures/store/uiSlice.fixtures';

describe('Pruebas en uiSlice', () => {
    test('debe de regresar el estado por defecto', () => {
        // expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState); // first form
        expect(uiSlice.getInitialState()).toEqual(initialState);
    });

    test('debe de cambiar el isDateModalOpen correctamente', () => {
        expect(reducer(state, onOpenDateModal())).toBeTruthy();
        const state = reducer(state, onOpenDateModal());
        expect(reducer(state, onCloseDateModal()).isDateModalOpen).toBeFalsy();;
    });
});