import { profileApi } from '@/api/profile/profileApi'
import { IUser } from '@/entity/entity'
import Input from '@/UI/Input/Input'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSWRConfig } from 'swr'
import s from './UpdateProfileModal.module.scss'

interface UpdateProfileModalProps {
    close: () => void
    user: IUser
}

interface formState {
    name: string
    slug: string
    description: string
}
let emptyUUID = '550e8400-e29b-41d4-a716-446655440000'

const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({
    close,
    user,
}) => {
    useEffect(() => {
        document.documentElement.style.overflowY = 'hidden'
        return () => {
            document.documentElement.style.overflowY = 'auto'
        }
    }, [])

    const { mutate } = useSWRConfig()

    const { register, handleSubmit } = useForm<formState>({
        defaultValues: {
            description: user.description || '',
            name: user.name || '',
            slug: user.slug || '',
        },
    })

    const updateProfile = async (data: formState) => {
        try {
            const res = await profileApi.updateUser({
                coverId: user.cover?.id || emptyUUID,
                description: data.description,
                imageId: user.image?.id,
                name: data.name,
                slug: data.slug,
            })
            mutate('profile', res, { revalidate: false })
            close()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={s.wrapper} onClick={close}>
            <form
                className={s.cont}
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit(updateProfile)}
            >
                <h2 className={s.title}>Редактировать профиль</h2>
                <div className={s.body}>
                    <div className={s.el}>
                        <p>Имя</p>
                        <Input {...register('name', { required: true })} />
                    </div>
                    <div className={s.el}>
                        <p>Адрес профиля</p>
                        <div className={s.address}>
                            <div>example.com/</div>
                            <input {...register('slug', { required: true })} />
                        </div>
                    </div>
                    <div className={s.el}>
                        <p>Описание</p>
                        <textarea
                            className={s.area}
                            {...register('description', { required: true })}
                        ></textarea>
                    </div>
                </div>
                <div className={s.footer}>
                    <button onClick={close}>Отмена</button>
                    <button type="submit">Сохранить</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateProfileModal
