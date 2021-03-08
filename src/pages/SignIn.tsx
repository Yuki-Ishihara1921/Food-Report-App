import React, { FC, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { signIn } from '../reducks/users/operations'
import { TextInput, ButtonClick } from '../components/UIkit'
import { ChangeEvent } from '../types'
import { Link } from '@material-ui/core'
import { Mail, Lock } from '@material-ui/icons'

const SignIn: FC = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState<string>(""),
          [password, setPassword] = useState<string>("")
          
    const inputEmail = useCallback((e: ChangeEvent) => {
        setEmail(e.target.value)
    }, [setEmail])

    const inputPassword = useCallback((e: ChangeEvent) => {
        setPassword(e.target.value)
    }, [setPassword])

    return (
        <section className="auth">
            <div className="auth__container">
                <h2 className="text-headline">ログイン</h2>
                <TextInput
                    background={"#fff"} icon={<Mail />} label={"メールアドレス"}
                    margin={"dense"} multiline={false} required={true}
                    rows={1} type={"email"} value={email}
                    variant={"standard"} width={"100%"}  onChange={inputEmail}
                />
                <TextInput
                    background={"#fff"} icon={<Lock />} label={"パスワード"}
                    margin={"dense"} multiline={false} required={true}
                    rows={1} type={"password"} value={password}
                    variant={"standard"} width={"100%"} onChange={inputPassword}
                />
                <ButtonClick
                    color={"primary"} label={"ログイン"} startIcon={""}
                    onClick={() => dispatch(signIn(email, password))}
                />
                <br/>
                <Link href="#" onClick={() => dispatch(push('/signup'))}>
                    アカウント登録はこちら
                </Link>
            </div>
        </section>
    )
}

export default SignIn
