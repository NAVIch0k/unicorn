import { IUser } from '@/entity/entity'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import s from './UserList.module.scss'
import { useGetUsers } from './useGetUsers'

interface UserListProps {
    userList: IUser[]
}

const UserList: React.FC<UserListProps> = ({ userList }) => {
    const { data } = useGetUsers({ userList })
    return (
        <div className={s.cont}>
            <h1 className={s.title}>Список аккаунтов</h1>
            <div className={s.list}>
                {(data?.length ? data : userList)?.map((el) => (
                    <Link
                        href={`account/guest/${el.slug}`}
                        className={s.el}
                        key={el.email}
                    >
                        <div className={s.el__info}>
                            <div>
                                {el.image && +el.image?.width ? (
                                    <Image
                                        src={el.image.url}
                                        alt=""
                                        width={+el.image.width}
                                        height={+el.image.height}
                                    />
                                ) : (
                                    el.name[0].toUpperCase()
                                )}
                            </div>
                            <p>{el.name}</p>
                        </div>
                        <p>{el.email}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default UserList
