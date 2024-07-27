import Link from "next/link";
import s from "./Footer.module.scss";

const Footer = ({ isLogin }: { isLogin: boolean }) => {
  return (
    <div className={s.cont}>
      <div className={s.content}>
        {isLogin ? (
          <>
            <p>Еще нет аккаунта? </p>
            <Link href={"/register"}>Зарегистрироваться</Link>
          </>
        ) : (
          <>
            <p>Уже есть аккаунт?</p>
            <Link href={"/login"}>Войти</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Footer;
