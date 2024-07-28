import { profileApi } from '@/api/profile/profileApi'
import { IUser } from '@/entity/entity'
import useSWR from 'swr'

export const useGetUserInfo = ({ user }: { user?: IUser }) => {
    return useSWR('user', profileApi.getInfo, { fallbackData: user })
}
