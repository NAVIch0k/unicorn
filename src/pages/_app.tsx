import Header from '@/component/Header/Header'
import { IUser } from '@/entity/entity'
import '@/styles/index.scss'
import clsx from 'clsx'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import s from './app.module.scss'

const inter = Inter({ subsets: ['latin'], weight: ['500', '400'] })

export default function App({ Component, pageProps }: AppProps) {
    const user = pageProps?.user as IUser | undefined
    return (
        <div className={clsx(inter.className, s.cont)}>
            <Header avatar={user?.image} name={user?.name} />
            <Component {...pageProps} />
        </div>
    )
}
