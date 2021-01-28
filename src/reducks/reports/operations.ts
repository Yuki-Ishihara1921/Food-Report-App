import { Dispatch } from "redux"
import { push } from "connected-react-router"
import { db, FirebaseTimestamp } from "../../firebase"
import { deleteReportAction, fetchReportsAction } from "./actions"
import { EditReport, ReportData, ReportState } from "./types"

export const saveReport = (uid: string, editReport: EditReport) => {
    return async (dispatch: Dispatch) => {
        const res = window.confirm("こちらの内容でよろしいですか？")
        if (!res) {
            return false
        } else {
            const reportsRef = db.collection('users').doc(uid).collection('reports')
            const timestamp = FirebaseTimestamp.now()
            if (editReport.id === "") {
                const ref = reportsRef.doc()
                editReport.id = ref.id
            }
            const newReport: ReportData = {
                id: editReport.id,
                name: editReport.name,
                images: editReport.images,
                rate: editReport.rate,
                date: editReport.date,
                price: editReport.price,
                station: editReport.station,
                category: editReport.category,
                url: editReport.url,
                description: editReport.description,
                updated_at: timestamp,
            }
            return reportsRef.doc(editReport.id).set(newReport, { merge: true })
            .then(() => {
                dispatch(push('/'))
            })
            .catch((error) => {
                throw new Error(error)
            })
        }
    }
}

export const fetchReports = (uid: string) => {
    return async (dispatch: Dispatch) => {
        db.collection('users').doc(uid).collection('reports').orderBy('updated_at', 'desc').get()
        .then((snapshots) => {
            const reportsList: ReportData[] = []
            snapshots.forEach((snapshot) => {
                const report = snapshot.data()
                reportsList.push({
                    id: report.id,
                    name: report.name,
                    images: report.images,
                    rate: report.rate,
                    date: report.date,
                    price: report.price,
                    station: report.station,
                    category: report.category,
                    url: report.url,
                    description: report.description,
                    updated_at: report.updated_at
                })
            })
            dispatch(fetchReportsAction(reportsList))
        })
    }
}

export const deleteReport = (uid: string, reportId: string) => {
    return async (dispatch: Dispatch, getState: any) => {
        const res = window.confirm("こちらのレポートを削除しますか？")
        if (!res) {
            return false
        } else {
            db.collection('users').doc(uid).collection('reports').doc(reportId).delete()
            .then(() => {
                const prevReports = getState().reports.list
                const nextReports = prevReports.filter((report: ReportState) => report.id !== reportId)
                dispatch(deleteReportAction(nextReports))
            })
        }
    }
}