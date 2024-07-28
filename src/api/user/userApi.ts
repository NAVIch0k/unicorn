import { IUser } from '@/entity/entity'
import { instance } from '..'

export const userApi = {
    async getInfo() {
        const res = await instance.get<IUser>('profile')
        return res.data
    },
}
