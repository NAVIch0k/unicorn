import { URL } from '@/api'
import { IUser } from '@/entity/entity'
import ProfilePage from '@/screen/ProfilePage/ProfilePage'
import { GetServerSideProps } from 'next'

const redirect = () => ({
    redirect: {
        permanent: false,
        destination: '/login',
    },
    props: {},
})

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    if (req.cookies?.token) {
        try {
            let res = await fetch(URL + 'profile', {
                headers: {
                    ['X-Api-Key']: req.cookies.token,
                },
            })
            if (res.status === 401) {
                throw new Error('Unauthorized')
            }
            res = await res.json()
            return {
                props: {
                    user: res,
                    token: req.cookies.token,
                },
            }
        } catch (e) {
            console.log(e)
            return redirect()
        }
    } else {
        return redirect()
    }
}

const Profile = ({ user, token }: { user: IUser; token: string }) => {
    return <ProfilePage user={user} token={token} />
}

export default Profile
