import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../src/store";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { Provider } from "react-redux";
import { authenticatedState, initialState, notAuthenticatedState } from "../fixtures/store/authStates";
import { testUserCredential } from "../fixtures/store/textUser";
import { calendarApi } from "../../src/api";

const getMockStore = (initialState) => {
    return configureStore({ // configurar un store personalizado solo para pruebas
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })

}

describe('Pruebas en useAuthStore', () => {

    beforeEach(() => localStorage.clear()); // antes de cada prueba limpiar el localStorage
    afterEach(() => {
        // restore replaced property
        jest.restoreAllMocks();
    });

    test('debe de regresar los valores por defecto', () => {
        const mockStore = getMockStore(initialState);

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        expect(result.current).toEqual({
            status: expect.stringContaining(initialState.status),
            user: expect.objectContaining(initialState.user),
            errorMessage: undefined,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function)
        });
    });

    test('startLogin debe de hacer el login correctamente', async () => {
        localStorage.clear();
        const mockStore = getMockStore(notAuthenticatedState);

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { startLogin } = result.current;

        // await y async para funciones asincronas
        await act(async () => {
            await startLogin(testUserCredential);
        });

        expect(result.current).toEqual({
            ...authenticatedState,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function)
        });

        expect(localStorage.getItem('token')).toEqual(expect.any(String));
        expect(localStorage.getItem('token-date')).toEqual(expect.any(String));

    });

    test('startLogin debe fallar la autenticacion', async () => {
        localStorage.clear();
        const mockStore = getMockStore(initialState);

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const {
            startLogin,
        } = result.current;

        await act(async () => {
            await startLogin({ email: 'algo@gmail.com', password: '1234567890' });
        });

        expect(localStorage.getItem('token')).toBe(null);
        expect({
            status: result.current.status,
            user: result.current.user,
            errorMessage: result.current.errorMessage
        }).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: expect.any(String)
        });

        // Cuando necesite esperar un período de tiempo, puede utilizar waitFor, para esperar a que se cumplan sus expectativas.
        // await waitFor(
        //     () => expect(errorMessage).toBe(undefined)
        // );

    });

    test('startRegister debe de crear un usuario', async () => {
        const newUser = {
            name: 'Daniel',
            email: 'nando@algo.com',
            password: '12345678'
        }

        const mockStore = getMockStore(initialState);
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { startRegister } = result.current;


        /**
         * jest.spyOn nos permite espiar una función, es decir, 
         * nos permite rastrear si se llamó, cuántas veces se llamó, con qué argumentos y más.
         * Aquí rastrea si se dispara en alguna funcion el objeto ``calendarApi`` 
         * con el metodo ``post`` y luego con el mockReturnValue 
         * nos permite simular un resultado
         */
        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
            data: {
                ok: true,
                msg: "registro",
                uid: "668cce1049c52f51f07e5349",
                name: "david",
                token: "ALGUN_TOKEN"
            }
        });

        await act(async () => {
            await startRegister(newUser);
        });

        expect({
            status: result.current.status,
            user: result.current.user,
            errorMessage: result.current.errorMessage
        }).toEqual({
            ...authenticatedState
        });

        spy.mockRestore(); // destruye el spy


    });

    test('startRegister debe de fallar la creacion', async () => {
        const mockStore = getMockStore(initialState);

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { startRegister } = result.current;

        await act(async () => {
            await startRegister({
                name: 'david',
                email: 'david@algo.com',
                password: '12345678'
            });
        });

        const { status, user, errorMessage } = result.current;

        expect({
            status,
            user,
            errorMessage
        }).toEqual({
            ...initialState,
            errorMessage: expect.any(String)
        });

    });

    test('checkAuthToken debe de fallar si no hay token', async () => {
        const mockStore = getMockStore(initialState);
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });
        const { checkAuthToken } = result.current;
        await act(async () => {
            await checkAuthToken();
        });
        const { status, errorMessage, user } = result.current;
        expect({ status, errorMessage, user }).toEqual(initialState);
    });

    test('checkAuthToken debe de autenticar el usuario si hay un token', async () => {
        localStorage.setItem('token', 'ALGUN_TOKEN');
        const mockStore = getMockStore(initialState);
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });
        const { checkAuthToken } = result.current;
        const spy = jest.spyOn(calendarApi, 'get').mockReturnValue({
            data: {
                ok: true,
                uid: "66988f44c7ff70013fbd6ae1",
                name: "test",
                token: 'ALGUN_TOKEN'
            }
        });
        await act(async () => {
            await checkAuthToken();
        });

        const { status, user, errorMessage } = result.current;

        console.log(result.current);
        

        expect({ status, user, errorMessage }).toEqual({
            status: 'authenticated',
            user: {
                uid: "66988f44c7ff70013fbd6ae1",
                name: "test"
            },
            errorMessage: undefined
        });


        spy.mockRestore(); // destruye el spy        
    });


});