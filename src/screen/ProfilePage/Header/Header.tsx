import s from './Header.module.scss'

interface HeaderProps {
    cover: {
        id: string
        url: string
        width: string
        height: string
    }
    image: {
        id: string
        url: string
        width: string
        height: string
    }
    name: string
}

const Header: React.FC<HeaderProps> = ({ cover, image, name }) => {
    return (
        <div className={s.cont}>
            {cover ? <div></div> : <div className={s.back}></div>}
            {image ? (
                <div></div>
            ) : (
                <div className={s.avatar}>{name[0].toUpperCase()}</div>
            )}
        </div>
    )
}

export default Header
