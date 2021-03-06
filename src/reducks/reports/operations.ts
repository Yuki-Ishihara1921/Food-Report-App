import { Dispatch } from "redux"
import { push } from "connected-react-router"
import { fetchReportsAction } from "./actions"
import { EditReport, Image, ReportData } from "./types"
import { showLoadingAction, hideLoadingAction } from "../loading/actions"
import { db, FirebaseTimestamp, storage } from "../../firebase"

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
                    updated_at: report.updated_at,
                    name: report.name,
                    url: report.url,
                    images: report.images,
                    rate: report.rate,
                    date: report.date,
                    price: report.price,
                    category: report.category,
                    place: report.place,
                    station: report.station,
                    description: report.description
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
                updated_at: timestamp,
                name: editReport.name,
                url: editReport.url,
                images: editReport.images,
                rate: editReport.rate,
                date: editReport.date,
                price: editReport.price,
                category: editReport.category,
                place: editReport.place,
                station: editReport.station,
                description: editReport.description
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

export const deleteReport = (uid: string, reportId: string, images: Image[]) => {
    return async (dispatch: Dispatch, getState: any) => {
        const res = window.confirm("こちらのレポートを削除しますか？")
        if (!res) {
            return false
        } else {
            dispatch(showLoadingAction("削除中..."))
            usersRef.doc(uid).collection('reports').doc(reportId).delete()
            .then(() => {
                for (let i = 0; i < images.length; i++) {
                    storage.ref('images').child(images[i].id).delete()
                }
                const prevReports: ReportData[] = getState().reports.list
                const nextReports = prevReports.filter((report: ReportData) => report.id !== reportId)
                dispatch(fetchReportsAction(nextReports))
                dispatch(hideLoadingAction())
                dispatch(push('/'))
            })
            .catch((error) => {
                dispatch(hideLoadingAction())
                alert("削除に失敗しました。もう一度お試し下さい。")
                throw new Error(error)
            })
        }
    }
}
