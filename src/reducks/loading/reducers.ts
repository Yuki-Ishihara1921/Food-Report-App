import * as Actions from './actions'
import { Loading, LoadingAction } from './type'

const initialState: Loading = {
    state: false,
    text: ""
}

export const LoadingReducer = (state = initialState, action: LoadingAction) => {
    switch (action.type) {
        case Actions.HIDE_LOADING:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SHOW_LOADING:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}