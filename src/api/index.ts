import { getCookie } from '@/utils/getCookie'
import axios from 'axios'
import { setCookie } from '../utils/setCookie'

export const URL = process.env.BASE_URL

export const instance = axios.create({
    baseURL: URL,
})

instance.interceptors.request.use(async (config) => {
    let token = getCookie('token')
    if (token && !config.headers.Authorization)
        config.headers['X-Api-Key'] = `Bearer ${token}`
    return config
})

instance.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        if (error?.response?.status === 401) {
            setCookie('token', '', {
                'max-age': -1,
            })
            window.location.replace('/login')
        }

        throw error
    }
)
