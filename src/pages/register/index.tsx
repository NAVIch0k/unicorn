import Footer from '@/component/Footer/Footer'
import { GetServerSideProps } from 'next'
import React from 'react'

export const getServerSideProps: GetServerSideProps = async ({
  resolvedUrl
}) => {
  return { props: { isLogin: resolvedUrl == '/login' } }
}

const Register = ({ isLogin }: { isLogin: boolean }) => {
  return (
    <>
      <div>LOL</div>
      <Footer isLogin={isLogin} />
    </>
  )
}

export default Register
