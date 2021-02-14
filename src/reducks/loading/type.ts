import { HIDE_LOADING, SHOW_LOADING } from "./actions"

export type Loading = {
    state: boolean
    text: string
}

type HideLoadingAction = {
    type: typeof HIDE_LOADING
    payload: Loading
}

type ShowLoadingAction = {
    type: typeof SHOW_LOADING
    payload: Loading
}

export type LoadingAction = HideLoadingAction | ShowLoadingAction