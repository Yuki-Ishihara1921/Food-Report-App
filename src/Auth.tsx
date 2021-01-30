import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './reducks/store'
import { listenAuthState } from './reducks/users/operations'

const Auth: FC = ({children}) => {
    const dispatch = useDispatch()
    const selector = useSelector((state: RootState) => state)
    const isSignedIn = selector.users.isSignedIn
    
    useEffect(() => {
        if (!isSignedIn) {
            dispatch(listenAuthState())
        }
    }, [])

    if (!isSignedIn) {
        return <></>
    } else {
        return (
            <>{children}</>
        )
    }
}

export default Auth
