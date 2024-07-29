import { imageApi } from '@/api/image/imageApi'
import { profileApi } from '@/api/profile/profileApi'
import { IUser } from '@/entity/entity'
import Image from 'next/image'
import { ChangeEvent, useId } from 'react'
import { useSWRConfig } from 'swr'
import s from './Header.module.scss'

interface HeaderProps {
    user: IUser
    isGuest: boolean
}

let emptyUUID = '550e8400-e29b-41d4-a716-446655440000'

const Header: React.FC<HeaderProps> = ({ user, isGuest }) => {
    const id = useId()
    const id2 = useId()
    const { mutate } = useSWRConfig()

    const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const formData = new FormData()
            formData.append('file', e.target.files?.[0])
            e.target.value = ''
            try {
                const data = await imageApi.uploadImage(formData)
                const res = await profileApi.updateUser({
                    coverId: data.id,
                    description: user.description,
                    imageId: user?.image?.id || emptyUUID,
                    name: user.name,
                    slug: user.slug,
                })
                mutate('profile', res, { revalidate: false })
            } catch (e) {
                console.log(e)
            }
        }
    }

    const deleteImage = async () => {
        try {
            const res = await profileApi.updateUser({
                coverId: emptyUUID,
                description: user.description,
                imageId: user?.image?.id || emptyUUID,
                name: user.name,
                slug: user.slug,
            })
            mutate('profile', res, { revalidate: false })
        } catch (e) {
            console.log(e)
        }
    }

    const uploadAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const formData = new FormData()
            formData.append('file', e.target.files?.[0])
            e.target.value = ''
            try {
                const data = await imageApi.uploadImage(formData)
                const res = await profileApi.updateUser({
                    coverId: user?.cover?.id || emptyUUID,
                    description: user.description,
                    imageId: data.id,
                    name: user.name,
                    slug: user.slug,
                })
                mutate('profile', res, { revalidate: false })
            } catch (e) {
                console.log(e)
            }
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
                    {!isGuest && (
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
                    )}
                </div>
            ) : (
                <div className={s.back}>
                    {!isGuest && (
                        <>
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
                            <input
                                type="file"
                                id={id}
                                onChange={uploadImage}
                            ></input>
                        </>
                    )}
                </div>
            )}
            <div className={s.avatar}>
                {user.image && +user.image.width ? (
                    <Image
                        src={user.image.url}
                        alt=""
                        width={+user.image.width}
                        height={+user.image.height}
                    />
                ) : (
                    user.name[0].toUpperCase()
                )}
                {!isGuest && (
                    <>
                        <label className={s.avatar__upload} htmlFor={id2}>
                            <Image
                                src={'/svg/photo.svg'}
                                width={41}
                                height={31}
                                alt=""
                            />
                        </label>
                        <input
                            type="file"
                            id={id2}
                            onChange={uploadAvatar}
                        ></input>
                    </>
                )}
            </div>
        </div>
    )
}

export default Header
