import { ReportListState, ReportState } from "./types"

export const FETCH_REPORTS = 'FETCH_REPORTS'
export const fetchReportsAction = (reports: ReportState[]) => {
    return {
        type: 'FETCH_REPORTS',
        payload: {
            list: reports
        }
    }
}

export const DELETE_REPORT = 'DELETE_REPORT'
export const deleteReportAction = (reports: ReportListState) => {
    return {
        type: 'DELETE_REPORT',
        payload: reports
    }
}
