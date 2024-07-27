import Footer from '@/component/Footer/Footer'
import RegisterPage from '@/screen/RegisterPage/RegisterPage'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({
    resolvedUrl,
}) => {
    return { props: { isLogin: resolvedUrl == '/login' } }
}

const Register = ({ isLogin }: { isLogin: boolean }) => {
    return (
        <>
            <RegisterPage />
            <Footer isLogin={isLogin} />
        </>
    )
}

export default Register
