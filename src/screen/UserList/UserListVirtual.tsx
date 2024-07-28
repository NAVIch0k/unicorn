import { IUser } from '@/entity/entity'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import s from './UserList.module.scss'

interface UserListProps {
    userList: IUser[]
}

const UserListVirtual: React.FC<UserListProps> = ({ userList }) => {
    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(0)
    const listRef = useRef<HTMLDivElement>(null)

    const itemHeight = 70 // Высота одного элемента списка
    const buffer = 8 // Количество элементов для буферизации

    const handleScroll = () => {
        if (!listRef.current) return

        const scrollTop = listRef.current.scrollTop
        const visibleStartIndex = Math.floor(scrollTop / itemHeight)
        const visibleEndIndex = Math.min(
            userList.length,
            visibleStartIndex + buffer * 2
        )

        setStartIndex(visibleStartIndex)
        setEndIndex(visibleEndIndex)
    }

    useEffect(() => {
        handleScroll() // Инициализация видимых элементов
        window.addEventListener('resize', handleScroll)
        return () => window.removeEventListener('resize', handleScroll)
    }, [userList])

    const visibleUsers = userList.slice(startIndex, endIndex)

    return (
        <div className={s.cont}>
            <h1 className={s.title}>Список аккаунтов</h1>
            <div
                className={s.list}
                ref={listRef}
                onScroll={handleScroll}
                style={{
                    height: `${buffer * itemHeight}px`,
                    overflowY: 'auto',
                }}
            >
                <div
                    style={{
                        height: `${userList.length * itemHeight}px`,
                        position: 'relative',
                    }}
                >
                    {visibleUsers.map((el, index) => (
                        <Link
                            href={`account/guest/${el.slug}`}
                            className={s.el}
                            key={el.email}
                            style={{
                                position: 'absolute',
                                top: `${(startIndex + index) * itemHeight}px`,
                                width: '100%',
                            }}
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
        </div>
    )
}

export default UserListVirtual
