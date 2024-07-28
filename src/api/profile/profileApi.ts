import { IUser } from '@/entity/entity'
import { instance } from '..'
import { updateUserProps } from './type'

export const profileApi = {
    async getInfo() {
        const res = await instance.get<IUser>('profile')
        return res.data
    },
    async updateUser(data: updateUserProps) {
        const res = await instance.patch<IUser>('profile', data)
        return res.data
    },
}
