import { renderHook, act } from "@testing-library/react";
import { useUiStore } from "../../src/hooks/useUiStore";
import { Provider } from "react-redux";
import { uiSlice } from "../../src/store";
import { configureStore } from "@reduxjs/toolkit";

const getMockStore = (initialState) => {
    return configureStore({ // configurar un store personalizado solo para pruebas
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    })

}

describe('Pruebas en useUiStore', () => {
    test('debe de regresar los valores por defecto', () => {
        const mockStore = getMockStore({ isDateModalOpen: false }); // inicializa el estado del store

        // renderHook se usa para probar hooks tanto personalizados como propios de react
        const { result } = renderHook(() => useUiStore(), { // result contine el valor retornado del hook
            //El wrapper pasa un componente React como la opción para que se represente alrededor del elemento interno
            // aqui el wrapper envuelve el useUiStore dentro de un provider(componente) con un store(mockStore) ya configurado
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        expect(result.current).toEqual({
            isDateModalOpen: false, // espera que sea false
            openDateModal: expect.any(Function), // espera que sea una funcion 
            closeDateModal: expect.any(Function), // espera que sea un funcion
        })
    });

    test('openDateModal debe de colocar true en el isDateModalOpen', () => {
        const mockStore = getMockStore({ isDateModalOpen: false }); // inicializa el estado del store

        // renderHook se usa para probar hooks tanto personalizados como propios de react
        // https://testing-library.com/docs/react-testing-library/api/#renderhook
        const { result } = renderHook(() => useUiStore(), { // result contine el valor retornado del hook
            //El wrapper pasa un componente React como la opción para que se represente alrededor del elemento interno
            // aqui el wrapper envuelve el useUiStore dentro de un provider(componente) con un store(mockStore) ya configurado
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { openDateModal } = result.current;

        //  Al realizar la prueba, el código que provoca las actualizaciones del estado de React debe incluirse en un act
        act(() => {
            openDateModal();
        })

        expect(result.current.isDateModalOpen).toBeTruthy(); // espera a que isDateModalOpen sea true

    });

    test('closeDateModal debe de colocar false en el isDateModalOpen', () => {
        const mockStore = getMockStore({ isDateModalOpen: true });

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { closeDateModal } = result.current;

        // act se usa cuando se invoca una funcion que cambia el estado en react
        act(() => {
            closeDateModal();
        });

        expect(result.current.isDateModalOpen).toBeFalsy();
    });
});