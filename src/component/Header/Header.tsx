import Image from 'next/image'
import { useRouter } from 'next/router'
import s from './Header.module.scss'

interface HeaderProps {
    name?: string
    avatar?: {
        id: string
        url: string
        width: string
        height: string
    }
}

const Header: React.FC<HeaderProps> = ({ avatar, name }) => {
    const router = useRouter()
    return (
        <div className={s.cont}>
            <div className={s.left}>
                <div className={s.logo}>
                    <Image
                        alt="Yoldi"
                        src={'/svg/logo.svg'}
                        width={63}
                        height={19}
                    />
                </div>
                <p>Разрабатываем и запускаем сложные веб проекты</p>
            </div>
            {avatar || name ? (
                <div className={s.info}>
                    <p>{name}</p>
                    {avatar?.width && +avatar?.width ? (
                        <div></div>
                    ) : (
                        name && (
                            <div className={s.avatar}>
                                {name[0].toUpperCase()}
                            </div>
                        )
                    )}
                </div>
            ) : (
                <button className={s.btn} onClick={() => router.push('/login')}>
                    Войти
                </button>
            )}
        </div>
    )
}

export default Header
