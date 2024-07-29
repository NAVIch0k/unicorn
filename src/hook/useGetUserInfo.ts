import { profileApi } from '@/api/profile/profileApi'
import { userApi } from '@/api/user/userApi'
import { IUser } from '@/entity/entity'
import useSWR from 'swr'

interface useGetUserInfoProps {
    user?: IUser
    slug?: string | null
    token?: string
}

export const useGetUserInfo = ({
    user,
    slug = null,
    token,
}: useGetUserInfoProps) => {
    if (token || slug) {
        return useSWR(
            'profile',
            slug ? () => userApi.getUserInfo(slug) : profileApi.getInfo,
            {
                fallbackData: user,
                revalidateOnFocus: false,
            }
        )
    } else {
        return {
            data: null,
        }
    }
}
