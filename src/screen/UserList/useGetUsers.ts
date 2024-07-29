import { userApi } from '@/api/user/userApi'
import { IUser } from '@/entity/entity'
import useSWR from 'swr'

export const useGetUsers = ({ userList }: { userList?: IUser[] }) => {
    return useSWR('users', userApi.getAllUsers, { fallbackData: userList,revalidateOnFocus:false })
}
