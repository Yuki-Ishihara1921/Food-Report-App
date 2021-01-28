import firebase from 'firebase/app'

export type UserState = {
    isSignedIn: boolean
    uid: string
    username: string
}

export type UserData = {
    uid: string
    username: string
    email: string
    created_at: firebase.firestore.Timestamp
}

// Actions
import { SIGN_IN, SIGN_OUT } from './actions'
type SignInAction = {
    type: typeof SIGN_IN
    payload: UserState
}

type SignOutAction = {
    type: typeof SIGN_OUT
    payload: UserState
}

export type AuthAction = SignInAction | SignOutAction