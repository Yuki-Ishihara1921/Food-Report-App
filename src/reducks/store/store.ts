import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux'
import { UserReducer } from '../users/reducers'
import { ReportReducer } from '../reports/reducers'
import { LoadingReducer } from '../loading/reducers'
import thunk from 'redux-thunk'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

const createStore = () => {
    return reduxCreateStore(
        combineReducers({
            users: UserReducer,
            reports: ReportReducer,
            loading: LoadingReducer,
            router: connectRouter(history)
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
}

export const store = createStore()

const rootReducer = combineReducers({
    users: UserReducer,
    reports: ReportReducer,
    loading: LoadingReducer,
    router: connectRouter(history)
})

export type RootState = ReturnType<typeof rootReducer>

