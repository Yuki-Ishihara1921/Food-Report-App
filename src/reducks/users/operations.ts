import { Dispatch } from "redux"
import { push } from "connected-react-router"
import { auth, db, FirebaseTimestamp } from "../../firebase"
import { signInAction, signOutAction } from "./actions"
import { UserData } from "./types"

export const signUp = (username: string, email: string, password: string, confirmPassword: string) => {
    return async (dispatch: Dispatch) => {
        const res = window.confirm("こちらの内容でよろしいですか？")
        if (!res) {
            return false
        } else {
            try {
                // varidation
                if (username === "" || email === "" || password === "" || confirmPassword === "") {
                    alert("必須項目が未入力です。")
                    return false
                }
                if (password !== confirmPassword) {
                    alert("パスワードが一致していません。もう一度お試し下さい。")
                    return false
                }
                // firebase authentication
                return auth.createUserWithEmailAndPassword(email, password)
                .then(result => {
                    const user = result.user
                    if (user) {
                        const uid = user.uid
                        const timestamp = FirebaseTimestamp.now()
                        const userInitialData: UserData = {
                            uid: uid,
                            username: username,
                            email: email,
                            created_at: timestamp
                        }
                        // firestoreにデータ保存
                        db.collection('users').doc(uid).set(userInitialData)
                        .then(() => {
                            // reduxのstoreに保存(ログイン状態)
                            dispatch(signInAction({
                                isSignedIn: true,
                                uid: uid,
                                username: username
                            }))
                            dispatch(push('/'))
                        })
                    }
                })
            }
            catch (error) {
                console.log(error)
            }
        }
    }
}

export const signIn = (email: string, password: string) => {
    return async (dispatch: Dispatch) => {
        // validation
        if (email === "" || password === "") {
            alert("必須項目が未入力です。")
            return false
        }
        // firebase authentication
        auth.signInWithEmailAndPassword(email, password)
        .then(result => {
            const user = result.user
            if (user) {
                const uid = user.uid
                db.collection('users').doc(uid).get()
                .then(snapshot => {
                    const userData = snapshot.data()
                    if (userData) {
                        // reduxのstoreに保存
                        dispatch(signInAction({
                            isSignedIn: true,
                            uid: uid,
                            username: userData.username
                        }))
                        dispatch(push('/'))
                    }
                })
            }
        })
    }
}

export const signOut = () => {
    return async (dispatch: Dispatch) => {
        auth.signOut()
        .then(() => {
            dispatch(signOutAction())
            dispatch(push('/signin'))
        })
    }
}

// ログイン状態でなく、サインアウトしていない時に発動
export const listenAuthState = () => {
    return async (dispatch: Dispatch) => {
        auth.onAuthStateChanged(user => {
            if (user) {
                const uid = user.uid
                db.collection('users').doc(uid).get()
                .then(snapshot => {
                    const userData = snapshot.data()
                    if (userData) {
                        dispatch(signInAction({
                            isSignedIn: true,
                            uid: uid,
                            username: userData.username
                        }))
                    }
                })
            } else {
                dispatch(push('/signin'))
            }
        })
    }
}