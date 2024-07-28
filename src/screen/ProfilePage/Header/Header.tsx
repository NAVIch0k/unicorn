import { imageApi } from '@/api/image/imageApi'
import { userApi } from '@/api/user/userApi'
import { IUser } from '@/entity/entity'
import Image from 'next/image'
import { ChangeEvent, useId } from 'react'
import { useSWRConfig } from 'swr'
import s from './Header.module.scss'

interface HeaderProps {
    user: IUser
}

let emptyUUID = '550e8400-e29b-41d4-a716-446655440000'

const Header: React.FC<HeaderProps> = ({ user }) => {
    const id = useId()
    const { mutate } = useSWRConfig()
    const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const formData = new FormData()
            formData.append('file', e.target.files?.[0])
            e.target.value = ''
            try {
                const data = await imageApi.uploadImage(formData)
                console.log(data)
                await userApi.updateUser({
                    coverId: data.id,
                    description: user.description,
                    imageId: user?.image?.id || emptyUUID,
                    name: user.name,
                    slug: user.slug,
                })
                mutate('user')
            } catch (e) {
                console.log(e)
            }
        }
    }

    const deleteImage = async () => {
        try {
            await userApi.updateUser({
                coverId: emptyUUID,
                description: user.description,
                imageId: user?.image?.id || emptyUUID,
                name: user.name,
                slug: user.slug,
            })
            mutate('user')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={s.cont}>
            {user.cover && +user.cover.width ? (
                <div className={s.backImage}>
                    <Image
                        src={user.cover.url}
                        alt=""
                        width={+user.cover.width}
                        height={+user.cover.height}
                    />
                    <button onClick={deleteImage}>
                        <Image
                            src={'/svg/trash.svg'}
                            width={17}
                            height={19}
                            alt=""
                        />
                        <p>Удалить</p>
                        <Image
                            src={'/svg/picture.svg'}
                            width={22}
                            height={17}
                            alt=""
                        />
                    </button>
                </div>
            ) : (
                <div className={s.back}>
                    <label htmlFor={id}>
                        <Image
                            src={'/svg/upload.svg'}
                            width={14}
                            height={19}
                            alt=""
                        />
                        <p>Загрузить</p>
                        <Image
                            src={'/svg/picture.svg'}
                            width={22}
                            height={17}
                            alt=""
                        />
                    </label>
                    <input type="file" id={id} onChange={uploadImage}></input>
                </div>
            )}
            {user.image ? (
                <div></div>
            ) : (
                <div className={s.avatar}>{user.name[0].toUpperCase()}</div>
            )}
        </div>
    )
}

export default Header
