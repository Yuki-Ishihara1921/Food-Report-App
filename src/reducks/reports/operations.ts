import { Dispatch } from "redux"
import { push } from "connected-react-router"
import { fetchReportsAction } from "./actions"
import { EditReport, ReportData } from "./types"
import { showLoadingAction, hideLoadingAction } from "../loading/actions"
import { db, FirebaseTimestamp } from "../../firebase"

const usersRef = db.collection('users')

export const fetchReports = (uid: string, category: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(showLoadingAction("データ取得中"))
        let query = usersRef.doc(uid).collection('reports').orderBy('updated_at', 'desc')
        query = (category !== "") ? query.where('category', '==', category) : query
        query.get()
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
            dispatch(hideLoadingAction())
        })
    }
}

export const saveReport = (uid: string, editReport: EditReport) => {
    return async (dispatch: Dispatch) => {
        const res = window.confirm("こちらの内容で登録しますか？")
        if (!res) {
            return false
        } else {
            dispatch(showLoadingAction("レポート作成中..."))
            const reportsRef = usersRef.doc(uid).collection('reports')
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
                    dispatch(hideLoadingAction())
                    dispatch(push('/'))
                })
                .catch((error) => {
                    dispatch(hideLoadingAction())
                    throw new Error(error)
                })
        }
    }
}

export const deleteReport = (uid: string, reportId: string) => {
    return async (dispatch: Dispatch, getState: any) => {
        const res = window.confirm("こちらのレポートを削除しますか？")
        if (!res) {
            return false
        } else {
            dispatch(showLoadingAction("削除中..."))
            usersRef.doc(uid).collection('reports').doc(reportId).delete()
            .then(() => {
                const prevReports: ReportData[] = getState().reports.list
                const nextReports = prevReports.filter((report: ReportData) => report.id !== reportId)
                dispatch(fetchReportsAction(nextReports))
                dispatch(hideLoadingAction())
            })
            .catch((error) => {
                dispatch(hideLoadingAction())
                alert("削除に失敗しました。もう一度お試し下さい。")
                throw new Error(error)
            })
        }
    }
}