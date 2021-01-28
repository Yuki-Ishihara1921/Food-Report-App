import * as Actions from './actions'
import { AuthAction, UserState } from './types'

const initialState: UserState = {
    isSignedIn: false,
    uid: "",
    username: ""
}

export const UserReducer = (state = initialState, action: AuthAction) => {
    switch(action.type) {
        case Actions.SIGN_IN:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SIGN_OUT:
            return {
                ...action.payload
            }
        default:
            return state
    }
}