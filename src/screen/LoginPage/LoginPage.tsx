import Input from '@/UI/Input/Input'
import { setCookie } from '@/utils/setCookie'
import { useForm, UseFormWatch } from 'react-hook-form'
import s from './LoginPage.module.scss'
import { useLogin } from './useLogin'

interface formState {
    email: string
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

const LoginPage = () => {
    const { register, handleSubmit, watch } = useForm<formState>()

    const { trigger, isLoading } = useLogin()

    const submit = async (data: formState) => {
        try {
            const res = await trigger(data)
            setCookie('token', res)
        } catch (e: any) {
            console.log(e)
            alert(e?.response?.data?.message || 'Somethings went wrong')
        }
    }

    return (
        <div className={s.wrapper}>
            <form className={s.cont} onSubmit={handleSubmit(submit)}>
                <h1 className={s.title}>Вход в Yoldi Agency</h1>
                <div className={s.inputs}>
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
    const isFilled = Boolean(watch('email')) && Boolean(watch('password'))
    return (
        <button
            className={s.btn}
            type="submit"
            disabled={!isFilled || isLoading}
        >
            Войти
        </button>
    )
}

export default LoginPage
