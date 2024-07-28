import { authApi } from '@/api/auth/authApi'
import useSWRMutation from 'swr/mutation'

const fetcher = async (
    _: string,
    { arg }: { arg: Parameters<typeof authApi.register>[0] }
) => {
    return authApi.register(arg)
}

export const useRegister = () => {
    const { trigger, error, isMutating } = useSWRMutation('register', fetcher)

    return { trigger, error, isLoading: isMutating }
}
