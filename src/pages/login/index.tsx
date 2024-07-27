import Footer from '@/component/Footer/Footer'
import LoginPage from '@/screen/LoginPage/LoginPage'

const Login = () => {
    return (
        <>
            <LoginPage />
            <Footer isLogin={true} />
        </>
    )
}

export default Login
