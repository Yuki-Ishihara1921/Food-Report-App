import firebase from 'firebase/app'
import { DELETE_REPORT, FETCH_REPORTS } from "./actions"

export type Image = {
    id: string
    path: string
}

export type Category = {
    id: string
    name: string
}

export type ReportState = {
    id: string
    name: string
    url: string
    images: Image[]
    rate: number | null
    date: string
    price: number
    station: string
    category: string
    description: string
    updated_at: firebase.firestore.Timestamp
}

export type ReportListState = {
    list: ReportState[]
}

export type EditReport = {
    id: string
    name: string
    images: Image[]
    rate: number | null
    date: string
    price: number
    station: string
    category: string
    url: string
    description: string
}

export type ReportData = {
    id: string
    name: string
    url: string
    images: Image[]
    rate: number | null
    date: string
    price: number
    station: string
    category: string
    description: string
    updated_at: firebase.firestore.Timestamp
}

// Actions

type FetchReportsAction = {
    type: typeof FETCH_REPORTS
    payload: ReportListState
}

type DeleteReportAction = {
    type: typeof DELETE_REPORT
    payload: ReportListState
}

export type ReportAction = FetchReportsAction | DeleteReportAction
