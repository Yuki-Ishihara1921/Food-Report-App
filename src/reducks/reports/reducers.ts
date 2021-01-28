import * as Actions from './actions'
import { ReportAction, ReportListState　} from './types'

const initialState: ReportListState = {
    list: []
}

export const ReportReducer = (state = initialState, action: ReportAction) => {
    switch(action.type) {
        case Actions.FETCH_REPORTS:
            return {
                ...state,
                ...action.payload
            }
        case Actions.DELETE_REPORT:
            return {
                ...state,
                ...action.payload.list
            }
        default:
            return state
    }
}