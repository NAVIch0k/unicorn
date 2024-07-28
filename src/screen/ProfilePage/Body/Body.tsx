import { IUser } from '@/entity/entity'
import { setCookie } from '@/utils/setCookie'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { mutate } from 'swr'
import UpdateProfileModal from '../UpdateProfileModal/UpdateProfileModal'
import s from './Body.module.scss'

interface BodyProps {
    user: IUser
    isGuest: boolean
}

const Body: React.FC<BodyProps> = ({ user, isGuest }) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)

    const toggleModal = () => {
        setIsOpen((e) => !e)
    }

    const logOut = () => {
        setCookie('token', '', {
            'max-age': -1,
        })
        router
            .push('/login')
            .then(() =>
                mutate(['user', null, null], null, { revalidate: true })
            )
    }

    return (
        <div className={s.cont}>
            <div className={s.header}>
                <div className={s.header__info}>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
                {!isGuest && (
                    <button className={s.btn} onClick={toggleModal}>
                        <Image
                            src={'/svg/pen.svg'}
                            width={19}
                            height={19}
                            alt=""
                        />
                        <p>Редактировать</p>
                    </button>
                )}
            </div>
            <p className={s.desc}>{user.description}</p>
            {!isGuest && (
                <button className={s.btn} onClick={logOut}>
                    <Image
                        src={'/svg/logOut.svg'}
                        alt=""
                        width={19}
                        height={19}
                    />
                    <p>Выйти</p>
                </button>
            )}
            {isOpen && <UpdateProfileModal close={toggleModal} user={user} />}
        </div>
    )
}

export default Body
