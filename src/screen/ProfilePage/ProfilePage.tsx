import { IUser } from '@/entity/entity'
import Body from './Body/Body'
import Header from './Header/Header'
import { useGetUserInfo } from './useGetUserInfo'

const ProfilePage = ({ user }: { user: IUser }) => {
    const { data } = useGetUserInfo({ user })
    return (
        <>
            <Header user={data || user} />
            <Body user={data || user} />
        </>
    )
}

export default ProfilePage
