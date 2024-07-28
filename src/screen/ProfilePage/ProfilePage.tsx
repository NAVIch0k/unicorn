import { IUser } from '@/entity/entity'
import { useGetUserInfo } from '../../hook/useGetUserInfo'
import Body from './Body/Body'
import Header from './Header/Header'

interface ProfilePageProps {
    user: IUser
    slug?: string
    token?: string
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, slug, token }) => {
    const { data } = useGetUserInfo({ user, slug, token })
    return (
        <>
            <Header user={data || user} isGuest={!!slug} />
            <Body user={data || user} isGuest={!!slug} />
        </>
    )
}

export default ProfilePage
