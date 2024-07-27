import { authApi } from '@/api/auth/authApi'
import useSWRMutation from 'swr/mutation'

const fetcher = async (
    _: string,
    { arg }: { arg: Parameters<typeof authApi.login>[0] }
) => {
    return authApi.login(arg)
}

export const useLogin = () => {
    const { trigger, error, isMutating } = useSWRMutation(
        'login',
        fetcher
    )

    return { trigger, error, isLoading: isMutating }
}
