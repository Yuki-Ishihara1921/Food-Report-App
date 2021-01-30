import * as Actions from './actions'
import { ReportAction, ReportsState　} from './types'

const initialState: ReportsState = {
    list: []
}

export const ReportReducer = (state = initialState, action: ReportAction) => {
    switch(action.type) {
        case Actions.FETCH_REPORTS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}