import React, { FC, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { signUp } from '../reducks/users/operations'
import { Link } from '@material-ui/core'
import { Person, Mail, Lock } from '@material-ui/icons'
import { TextInput, ButtonClick } from '../components/UIkit'
import { ChangeEvent } from '../types'

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
        <div className="auth">
            <div className="auth__container">
                <h2 className="text-headline">ユーザー登録</h2>
                <TextInput
                    width={"100%"} label={"ユーザー名"} multiline={false}
                    required={true} rows={1} value={username} type={"text"} variant={"standard"}
                    icon={<Person />} onChange={inputUsername}
                />
                <TextInput
                    width={"100%"} label={"メールアドレス"} multiline={false}
                    required={true} rows={1} value={email} type={"email"} variant={"standard"}
                    icon={<Mail />} onChange={inputEmail}
                />
                <TextInput
                    width={"100%"} label={"パスワード"} multiline={false}
                    required={true} rows={1} value={password} type={"password"} variant={"standard"}
                    icon={<Lock />} onChange={inputPassword}
                />
                <TextInput
                    width={"100%"} label={"パスワード(確認用)"} multiline={false}
                    required={true} rows={1} value={confirmPassword} type={"password"} variant={"standard"}
                    icon={<Lock />} onChange={inputConfirmPassword}
                />
                <ButtonClick
                    startIcon={""} color={"primary"}
                    label={"アカウントを登録"} onClick={() => dispatch(signUp(username, email, password, confirmPassword))}
                />
                <br/>
                <Link href="#" onClick={() => dispatch(push('/signin'))}>ログインに戻る</Link>
            </div>
        </div>
    )
}

export default SignUp
