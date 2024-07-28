import { IUser } from '@/entity/entity'
import { instance } from '..'

export const userApi = {
    async getAllUsers() {
        const res = await instance.get<IUser[]>('user')
        return res.data
    },
}
