import { instance } from '..'
import { loginProps, signUpProps } from './type'

export const authApi = {
    async register(data: signUpProps) {
        const res = await instance.post<{ value: string }>('auth/sign-up', data)
        return res.data.value
    },
    async login(data: loginProps) {
        const res = await instance.post<{ value: string }>('auth/login', data)
        return res.data.value
    },
}
