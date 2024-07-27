import Image from 'next/image'
import s from './Header.module.scss'

const Header = () => {
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
            <button className={s.btn}>Войти</button>
        </div>
    )
}

export default Header
