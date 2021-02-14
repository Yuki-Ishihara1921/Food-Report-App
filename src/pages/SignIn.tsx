import React, { FC, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { signIn } from '../reducks/users/operations'
import { Link } from '@material-ui/core'
import { Mail, Lock } from '@material-ui/icons'
import { TextInput, SaveButton } from '../components/UIkit'
import { ChangeEvent } from '../type'

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
        <div className="auth">
            <div className="auth__container">
                <h2 className="text-headline">ログイン</h2>
                <TextInput
                    margin={"10px 10px 20px 10px"} width={"100%"} label={"メールアドレス"} multiline={false}
                    required={true} rows={1} value={email} type={"email"} variant={"standard"}
                    icon={<Mail />} onChange={inputEmail}
                />
                <TextInput
                    margin={"10px 10px 0px"} width={"100%"} label={"パスワード"} multiline={false}
                    required={true} rows={1} value={password} type={"password"} variant={"standard"}
                    icon={<Lock />} onChange={inputPassword}
                />
                <SaveButton
                    startIcon={""}
                    label={"ログイン"}
                    onClick={() => dispatch(signIn(email, password))}
                />
                <br/>
                <Link href="#" onClick={() => dispatch(push('/signup'))}>アカウント登録はこちら</Link>
            </div>
        </div>
    )
}

export default SignIn
