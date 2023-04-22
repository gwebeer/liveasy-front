import axios from 'axios';
import { getToken } from './Auth'

const api = axios.create({
    baseURL: "http://localhost:4000/"
})

api.interceptors.request.use(async config => {
    const AUTH_TOKEN = getToken();
    if (AUTH_TOKEN) {
        config.headers.Authorization = `Bearer ${AUTH_TOKEN}`
    }
    return config
})

export default api