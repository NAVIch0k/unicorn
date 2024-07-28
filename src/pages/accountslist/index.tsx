import { URL } from '@/api'
import { IUser } from '@/entity/entity'
import UserList from '@/screen/UserList/UserList'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    try {
        let res = await fetch(URL + 'user')
        res = await res.json()
        return {
            props: {
                userList: res,
                token: req.cookies?.token || null,
            },
        }
    } catch (e) {
        console.log(e)
        return {
            props: {
                userList: [],
            },
        }
    }
}

const AccountsList = (data: { userList: IUser[]; token: string }) => {
    return <UserList {...data} />
}

export default AccountsList
