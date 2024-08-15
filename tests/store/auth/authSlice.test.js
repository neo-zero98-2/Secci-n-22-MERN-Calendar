import reducer, { authSlice, onLogin, onChecking, onLogout, clearErrorMessage } from "../../../src/store/auth/authSlice"
import { authenticatedState, initialState, notAuthenticatedState } from "../../fixtures/store/authStates"
import { testUserCredential } from "../../fixtures/store/textUser";

describe('Pruebas de authSlice', () => { 
    test('deberia mostrar el estado inicial', () => {
        expect(authSlice.getInitialState()).toEqual(initialState);
     });

     test('deberia de realizar un login', () => { 
        const state = reducer(initialState, onLogin(testUserCredential));
        expect(state).toEqual({
            status: 'authenticated',
            user: testUserCredential,
            errorMessage: undefined
        });
     });

     test('deberia realizar el logout', () => { 
        const state = reducer(authenticatedState, onLogout());
        expect(state).toEqual(notAuthenticatedState);
     });

     test('deberia realizar el logout con error', () => { 
        const errorMessage = 'error de autenticacion'
        const state = reducer(authenticatedState, onLogout(errorMessage));
        expect(state).toEqual({
            ...notAuthenticatedState,
            errorMessage
        });
     });

     test('deberia limpiar los errores', () => { 
        const errorMessage = 'error de autenticacion'
        const previusState = reducer(authenticatedState, onLogout(errorMessage));
        expect(previusState).toEqual({
            ...notAuthenticatedState,
            errorMessage
        });
        const currentState = reducer(previusState, clearErrorMessage());
        expect(currentState.errorMessage).toEqual(undefined);
      });

      test('deberia llamar al onChecking', () => { 
        expect(reducer(initialState, onChecking())).toEqual({
            ...initialState,
            status: 'checking'
        });
      });

 })