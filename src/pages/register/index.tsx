import Footer from '@/component/Footer/Footer'
import RegisterPage from '@/screen/RegisterPage/RegisterPage'

const Register = () => {
    return (
        <>
            <RegisterPage />
            <Footer isLogin={false} />
        </>
    )
}

export default Register
