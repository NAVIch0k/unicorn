import Image from 'next/image'
import { useRouter } from 'next/router'
import s from './Header.module.scss'

const Header = () => {
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
            <button className={s.btn} onClick={() => router.push('/login')}>
                Войти
            </button>
        </div>
    )
}

export default Header
