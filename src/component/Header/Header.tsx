import { IUser } from '@/entity/entity'
import { useGetUserInfo } from '@/hook/useGetUserInfo'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import s from './Header.module.scss'

interface HeaderProps {
    user?: IUser
    slug?: string
    token?: string
}

const Header: React.FC<HeaderProps> = ({ user, slug, token }) => {
    const router = useRouter()
    const { data, isLoading } = useGetUserInfo({ user, slug, token })
    const userInfo = data || user
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
            {!isLoading &&
                (userInfo?.image || userInfo?.name ? (
                    <div className={s.info}>
                        <p>{userInfo.name}</p>
                        <div className={s.avatar}>
                            {userInfo?.image?.width &&
                            +userInfo?.image?.width ? (
                                <Image
                                    src={userInfo.image.url}
                                    alt=""
                                    width={+userInfo.image.width}
                                    height={+userInfo.image.height}
                                />
                            ) : (
                                userInfo?.name && userInfo.name[0].toUpperCase()
                            )}
                        </div>
                    </div>
                ) : (
                    <button
                        className={s.btn}
                        onClick={() => router.push('/login')}
                    >
                        Войти
                    </button>
                ))}
        </div>
    )
}

export default Header
