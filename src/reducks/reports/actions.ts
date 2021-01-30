import { ReportData } from "./types"

export const FETCH_REPORTS = 'FETCH_REPORTS'
export const fetchReportsAction = (reports: ReportData[]) => {
    return {
        type: 'FETCH_REPORTS',
        payload: {
            list: reports
        }
    }
}
