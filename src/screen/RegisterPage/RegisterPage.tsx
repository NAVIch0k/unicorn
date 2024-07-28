import Input from '@/UI/Input/Input'
import { setCookie } from '@/utils/setCookie'
import { useRouter } from 'next/router'
import { useForm, UseFormWatch } from 'react-hook-form'
import s from './RegisterPage.module.scss'
import { useRegister } from './useRegister'

interface formState {
    email: string
    name: string
    password: string
}

const ico = [
    {
        path: '/svg/human.svg',
        width: 16,
        height: 17,
    },
    {
        path: '/svg/inbox.svg',
        width: 21,
        height: 14,
    },
    {
        path: '/svg/lock.svg',
        width: 16,
        height: 21,
    },
]

const RegisterPage = () => {
    const router = useRouter()
    const { register, handleSubmit, watch } = useForm<formState>()

    const { trigger, isLoading } = useRegister()

    const submit = async (data: formState) => {
        try {
            const res = await trigger(data)
            setCookie('token', res)
            router.push('/account/owner')
        } catch (e: any) {
            console.log(e)
            alert(e?.response?.data?.message || 'Somethings went wrong')
        }
    }

    return (
        <div className={s.wrapper}>
            <form className={s.cont} onSubmit={handleSubmit(submit)}>
                <h1 className={s.title}>Регистрация в Yoldi Agency</h1>
                <div className={s.inputs}>
                    <Input label="Имя" ico={ico[0]} {...register('name')} />
                    <Input
                        label="E-mail"
                        ico={ico[1]}
                        {...register('email')}
                        type="email"
                    />
                    <Input
                        label="Пароль"
                        eye={true}
                        ico={ico[2]}
                        {...register('password')}
                    />
                </div>
                <Button watch={watch} isLoading={isLoading} />
            </form>
        </div>
    )
}

const Button = ({
    watch,
    isLoading,
}: {
    watch: UseFormWatch<formState>
    isLoading: boolean
}) => {
    const isFilled =
        Boolean(watch('email')) &&
        Boolean(watch('password')) &&
        Boolean(watch('name'))
    return (
        <button
            className={s.btn}
            type="submit"
            disabled={!isFilled || isLoading}
        >
            Создать аккаунт
        </button>
    )
}

export default RegisterPage
