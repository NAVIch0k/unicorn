import { setCookie } from '@/utils/setCookie'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import s from './Body.module.scss'

interface BodyProps {
    description: string
    email: string
    name: string
}

const Body: React.FC<BodyProps> = ({ description, email, name }) => {
    const router = useRouter()

    const logOut = () => {
        setCookie('token', '', {
            'max-age': -1,
        })
        router.push('/login').then(() => mutate('user', null, false))
    }

    return (
        <div className={s.cont}>
            <div className={s.header}>
                <div className={s.header__info}>
                    <h2>{name}</h2>
                    <p>{email}</p>
                </div>
                <button className={s.btn}>
                    <Image src={'/svg/pen.svg'} width={19} height={19} alt="" />
                    <p>Редактировать</p>
                </button>
            </div>
            <p className={s.desc}>{description}</p>
            <button className={s.btn} onClick={logOut}>
                <Image src={'/svg/logOut.svg'} alt="" width={19} height={19} />
                <p>Выйти</p>
            </button>
        </div>
    )
}

export default Body
