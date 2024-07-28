import { URL } from '@/api'
import { IUser } from '@/entity/entity'
import UserList from '@/screen/UserList/UserList'

export const getServerSideProps = async () => {
    try {
        let res = await fetch(URL + 'user')
        res = await res.json()
        return {
            props: {
                userList: res,
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

const AccountsList = ({ userList }: { userList: IUser[] }) => {
    return <UserList userList={userList} />
}

export default AccountsList
