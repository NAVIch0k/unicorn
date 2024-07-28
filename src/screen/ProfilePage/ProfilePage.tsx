import { IUser } from '@/entity/entity'
import Body from './Body/Body'
import Header from './Header/Header'
import { useGetUserInfo } from './useGetUserInfo'

const ProfilePage = ({ user }: { user: IUser }) => {
    const { data } = useGetUserInfo({ user })
    return (
        <>
            <Header
                cover={(data || user).cover}
                image={(data || user).image}
                name={(data || user).name}
            />
            <Body
                name={(data || user).name}
                description={(data || user).description}
                email={(data || user).email}
            />
        </>
    )
}

export default ProfilePage
