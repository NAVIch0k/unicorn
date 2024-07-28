import { URL } from '@/api'
import { IUser } from '@/entity/entity'
import ProfilePage from '@/screen/ProfilePage/ProfilePage'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({
    query,
    req,
}) => {
    const slug = query?.slug
    if (slug) {
        try {
            let res = await fetch(URL + `user/${slug}`)
            res = await res.json()
            return {
                props: {
                    user: res,
                    slug,
                    token: req.cookies?.token || null,
                },
            }
        } catch (e) {
            console.log(e)
            return {
                redirect: {
                    permanent: false,
                    destination: '/accountslist',
                },
                props: {},
            }
        }
    } else {
        return {
            redirect: {
                permanent: false,
                destination: '/accountslist',
            },
            props: {},
        }
    }
}

const GuestProfile = (data: { user: IUser; slug: string; token: string }) => {
    return <ProfilePage {...data} />
}

export default GuestProfile
