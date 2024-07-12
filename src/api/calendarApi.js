import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL }  = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_API_URL,
    timeout: 7000
});

// todo: configurar interceptors

calendarApi.interceptors.request.use( config => {
    if(config.method === 'get' || config.url.includes('/events')){
        config.headers = {
            ...config.headers,
            'x-token': localStorage.getItem('token')
        }
    }
    
    return config;
})

export default calendarApi;