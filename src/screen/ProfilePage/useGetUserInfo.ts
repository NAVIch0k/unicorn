import { userApi } from '@/api/user/userApi'
import { IUser } from '@/entity/entity'
import useSWR from 'swr'

export const useGetUserInfo = ({ user }: { user?: IUser }) => {
    return useSWR('user', userApi.getInfo, { fallbackData: user })
}
