import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {
    const dispatch = useDispatch();
    const { status, user, errorMessage } = useSelector(state => state.auth);

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post('/auth/', { email, password });
            localStorage.setItem('token',data.token);
            localStorage.setItem('token-date', new Date());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            console.error(error);
            if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK'){
                dispatch(onLogout("timeout"));
                return;
            }
            const { response: { data } } = error;
            dispatch(onLogout(data.msg[0].msg || data.msg))
        }
    }

    const startRegister = async({ name, email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post('/auth/new', { name, email, password });
            localStorage.setItem('token',data.token);
            localStorage.setItem('token-date', new Date());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            console.error(error);
            if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK'){
                dispatch(onLogout("timeout"));
                return;
            }
            const { response: { data } } = error;
            dispatch(onLogout(data.msg[0].msg || data.msg))
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if(!token) dispatch(onLogout());
        try {
            const { data } = await calendarApi.get('/auth/renew');
            localStorage.setItem('token',data.token);
            localStorage.setItem('token-date', new Date());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            console.error(error);
            if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK'){
                dispatch(onLogout("timeout"));
                return;
            }
            const { response: { data } } = error;
            dispatch(onLogout(data.msg[0].msg || data.msg))
            localStorage.clear();
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    return {
        status, 
        user, 
        errorMessage,
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}