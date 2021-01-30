import firebase from 'firebase/app'
import { FETCH_REPORTS } from "./actions"

export type Image = {
    id: string
    path: string
}

export type Category = {
    id: string
    name: string
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

export type ReportsState = {
    list: ReportData[]
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

// Actions
export type FetchReportsAction = {
    type: typeof FETCH_REPORTS
    payload: ReportsState
}

export type ReportAction = FetchReportsAction
