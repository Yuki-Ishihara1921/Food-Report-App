import { Dispatch } from "redux"
import { push } from "connected-react-router"
import { signInAction, signOutAction } from "./actions"
import { UserData } from "./types"
import { showLoadingAction, hideLoadingAction } from "../loading/actions"
import { auth, db, FirebaseTimestamp } from "../../firebase"

export const signUp = (username: string, email: string, password: string, confirmPassword: string) => {
    return async (dispatch: Dispatch) => {
        const res = window.confirm("こちらの内容でアカウントを作成しますか？")
        if (!res) {
            return false
        } else {
            dispatch(showLoadingAction("アカウント作成中..."))
            if (username === "" || email === "" || password === "" || confirmPassword === "") {
                dispatch(hideLoadingAction())
                alert("必須項目が未入力です。")
                return false
            }
            if (password !== confirmPassword) {
                dispatch(hideLoadingAction())
                alert("パスワードが一致していません。もう一度お試し下さい。")
                return false
            }
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
                        role: "customer",
                        created_at: timestamp
                    }
                    db.collection('users').doc(uid).set(userInitialData)
                    .then(() => {
                        dispatch(signInAction({
                            isSignedIn: true,
                            role: "customer",
                            uid: uid,
                            username: username
                        }))
                        dispatch(push('/'))
                        dispatch(hideLoadingAction())
                    })
                } else {
                    dispatch(hideLoadingAction())
                    alert("アカウントを登録できませんでした。もう一度お試し下さい。")
                    return false
                }
            })
            .catch((error) => {
                dispatch(hideLoadingAction())
                alert("アカウントを登録できませんでした。通信環境をご確認の上もう一度お試し下さい。")
                throw new Error(error)
            })
        }
    }
}

export const signIn = (email: string, password: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(showLoadingAction("ログイン中..."))
        if (email === "" || password === "") {
            dispatch(hideLoadingAction())
            alert("未入力の項目があります。")
            return false
        }
        auth.signInWithEmailAndPassword(email, password)
        .then(result => {
            const user = result.user
            if (user) {
                const uid = user.uid
                db.collection('users').doc(uid).get()
                .then(snapshot => {
                    const userData = snapshot.data()
                    if (userData) {
                        dispatch(signInAction({
                            isSignedIn: true,
                            role: userData.role,
                            uid: uid,
                            username: userData.username
                        }))
                        dispatch(hideLoadingAction())
                        dispatch(push('/'))
                    } else {
                        dispatch(hideLoadingAction())
                        throw new Error("ユーザー情報が存在しません。")
                    }
                })
            } else {
                dispatch(hideLoadingAction())
                throw new Error("ユーザー情報を取得できません。")
            }
        })
        .catch(() => {
            dispatch(hideLoadingAction())
            alert("ログインできませんでした。入力内容をご確認の上、再度お試し下さい。")
        })
    }
}

export const signOut = () => {
    return async (dispatch: Dispatch) => {
        const res = window.confirm("ログアウトしますか？")
        if (!res) {
            return false
        } else {
            dispatch(showLoadingAction("ログアウト中..."))
            auth.signOut()
            .then(() => {
                dispatch(signOutAction())
                dispatch(hideLoadingAction())
                dispatch(push('/signin'))
            })
            .catch((error) => {
                dispatch(hideLoadingAction())
                alert("ログアウトできませんでした。")
                throw new Error(error)
            })
        }
    }
}

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
                            role: userData.role,
                            uid: uid,
                            username: userData.username
                        }))
                    } else {
                        throw new Error("ユーザー情報が存在しません。")
                    }
                })
            } else {
                dispatch(push('/signin'))
            }
        })
    }
}