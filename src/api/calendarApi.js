import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL }  = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_API_URL,
    timeout: 5000
});

// todo: configurar interceptors

export default calendarApi;