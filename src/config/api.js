import axios from 'axios';
import { getToken } from './Auth'

const api = axios.create({
    baseURL: "https://liveasy-services.onrender.com/"
})

api.interceptors.request.use(async config => {
    const AUTH_TOKEN = getToken();
    if (AUTH_TOKEN) {
        config.headers.Authorization = `Bearer ${AUTH_TOKEN}`
    }
    return config
})

export default api