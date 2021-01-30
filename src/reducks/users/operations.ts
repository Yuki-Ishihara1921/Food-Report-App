import { Dispatch } from "redux"
import { push } from "connected-react-router"
import { auth, db, FirebaseTimestamp } from "../../firebase"
import { signInAction, signOutAction } from "./actions"
import { UserData } from "./types"
import { showLoadingAction, hideLoadingAction } from "../loading/action"

export const signUp = (username: string, email: string, password: string, confirmPassword: string) => {
    return async (dispatch: Dispatch) => {
        const res = window.confirm("こちらの内容でアカウントを作成しますか？")
        if (!res) {
            return false
        } else {
            dispatch(showLoadingAction("アカウント作成中..."))
            // varidation
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
                        dispatch(hideLoadingAction())
                    })
                } else {
                    dispatch(hideLoadingAction())
                    alert("アカウント登録に失敗しました。通信環境をご確認の上もう一度お試し下さい。")
                    return false
                }
            })
            .catch((error) => {
                dispatch(hideLoadingAction())
                alert("アカウント登録に失敗しました。通信環境をご確認の上もう一度お試し下さい。")
                throw new Error(error)
            })
        }
    }
}

export const signIn = (email: string, password: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(showLoadingAction("ログイン中..."))
        // validation
        if (email === "" || password === "") {
            dispatch(hideLoadingAction())
            alert("未入力の項目があります。")
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
                        dispatch(hideLoadingAction())
                        dispatch(push('/'))
                    } else {
                        dispatch(hideLoadingAction())
                        throw new Error("ユーザーデータが存在しません。")
                    }
                })
            } else {
                dispatch(hideLoadingAction())
                throw new Error("ユーザー情報を取得できません。")
            }
        })
        .catch(() => {
            dispatch(hideLoadingAction())
            alert("ログインに失敗しました。入力内容をご確認の上、再度お試し下さい。")
        })
    }
}

export const signOut = () => {
    return async (dispatch: Dispatch) => {
        dispatch(showLoadingAction("ログアウト中..."))
        auth.signOut()
        .then(() => {
            dispatch(signOutAction())
            dispatch(hideLoadingAction())
            dispatch(push('/signin'))
        })
        .catch((error) => {
            dispatch(hideLoadingAction())
            alert("ログアウトに失敗しました。")
            throw new Error(error)
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
                    } else {
                        throw new Error("ユーザーデータが存在しません。")
                    }
                })
            } else {
                dispatch(push('/signin'))
            }
        })
    }
}