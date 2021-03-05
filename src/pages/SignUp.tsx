import React, { FC, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { signUp } from '../reducks/users/operations'
import { TextInput, ButtonClick } from '../components/UIkit'
import { ChangeEvent } from '../types'
import { Link } from '@material-ui/core'
import { Person, Mail, Lock } from '@material-ui/icons'

const SignUp: FC = () => {
    const dispatch = useDispatch()
    
    const [username, setUsername] = useState<string>(""),
          [email, setEmail] = useState<string>(""),
          [password, setPassword] = useState<string>(""),
          [confirmPassword, setConfirmPassword] = useState<string>("")

    const inputUsername = useCallback((e: ChangeEvent) => {
        setUsername(e.target.value)
    }, [setUsername])

    const inputEmail = useCallback((e: ChangeEvent) => {
        setEmail(e.target.value)
    }, [setEmail])

    const inputPassword = useCallback((e: ChangeEvent) => {
        setPassword(e.target.value)
    }, [setPassword])
    
    const inputConfirmPassword = useCallback((e: ChangeEvent) => {
        setConfirmPassword(e.target.value)
    }, [setConfirmPassword])

    return (
        <section className="auth">
            <div className="auth__container">
                <h2 className="text-headline">ユーザー登録</h2>
                <TextInput
                    background={"#fff"} icon={<Person />} label={"ユーザー名"} multiline={false}
                    required={true} rows={1} type={"text"} value={username}
                    variant={"standard"} width={"100%"} onChange={inputUsername}
                />
                <TextInput
                    background={"#fff"} icon={<Mail />} label={"メールアドレス"} multiline={false}
                    required={true} rows={1} type={"email"} value={email}
                    variant={"standard"} width={"100%"} onChange={inputEmail}
                />
                <TextInput
                    background={"#fff"} icon={<Lock />} label={"パスワード"} multiline={false}
                    required={true} rows={1} type={"password"} value={password}
                    variant={"standard"} width={"100%"} onChange={inputPassword}
                />
                <TextInput
                    background={"#fff"} icon={<Lock />}  label={"パスワード(確認用)"} multiline={false}
                    required={true} rows={1} type={"password"} value={confirmPassword}
                    variant={"standard"} width={"100%"} onChange={inputConfirmPassword}
                />
                <ButtonClick
                    color={"primary"} label={"アカウントを登録"} startIcon={""}
                    onClick={() => dispatch(signUp(username, email, password, confirmPassword))}
                />
                <br/>
                <Link href="#" onClick={() => dispatch(push('/signin'))}>
                    ログインに戻る
                </Link>
            </div>
        </section>
    )
}

export default SignUp
