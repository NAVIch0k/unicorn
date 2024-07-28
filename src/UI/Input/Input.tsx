import Image from 'next/image'
import {
    DetailedHTMLProps,
    forwardRef,
    InputHTMLAttributes,
    MouseEvent,
    useImperativeHandle,
    useRef,
    useState,
} from 'react'
import s from './Input.module.scss'

interface InputProps
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    ico?: {
        path: string
        width: number
        height: number
    }
    eye?: boolean
    label?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ ico, eye, label, type, ...props }, ref) => {
        const [isHidden, setIsHidden] = useState(eye ? true : false)
        const inputRef = useRef<HTMLInputElement>(null)

        const toggleHidden = (
            e: MouseEvent<HTMLImageElement, globalThis.MouseEvent>
        ) => {
            e.stopPropagation()
            setIsHidden((state) => !state)
        }

        useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

        return (
            <div className={s.cont} onClick={() => inputRef.current?.focus()}>
                {ico && (
                    <Image
                        src={ico.path}
                        alt=""
                        width={ico.width}
                        height={ico.height}
                    />
                )}
                <input
                    type={isHidden ? 'password' : type||'text'}
                    ref={inputRef}
                    onClick={(e) => e.stopPropagation()}
                    placeholder={label}
                    {...props}
                />
                {eye &&
                    (isHidden ? (
                        <Image
                            src={'/svg/openEye.svg'}
                            alt=""
                            width={24}
                            height={13}
                            onClick={(e) => toggleHidden(e)}
                            className={s.eye}
                        />
                    ) : (
                        <Image
                            src={'/svg/closeEye.svg'}
                            alt=""
                            width={24}
                            height={22}
                            onClick={(e) => toggleHidden(e)}
                            className={s.eye}
                        />
                    ))}
            </div>
        )
    }
)

export default Input
