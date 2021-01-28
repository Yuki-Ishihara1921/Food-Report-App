import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { UserReducer } from '../users/reducers'
import { ReportReducer } from '../reports/reducers'
import { History } from 'history'

export default function createStore(history: History<unknown>) {
    return reduxCreateStore(
        combineReducers({
            users: UserReducer,
            reports: ReportReducer,
            router: connectRouter(history)
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
}

// rootStateの活用法がまだわからないため消さずに放置

const rootReducer = combineReducers({
    users: UserReducer,
    reports: ReportReducer
})

export type RootState = ReturnType<typeof rootReducer>
