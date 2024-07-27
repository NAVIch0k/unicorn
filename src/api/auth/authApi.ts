import { instance } from '..'
import { signUpProps } from './type'

export const authApi = {
    async register(data: signUpProps) {
        const res = await instance.post<{ value: string }>('auth/sign-up', data)
        return res.data.value
    },
}
