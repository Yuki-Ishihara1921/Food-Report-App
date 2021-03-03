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
    updated_at: firebase.firestore.Timestamp
    name: string
    url: string
    images: Image[]
    rate: number | null
    date: string
    price: number
    category: string
    place: string
    station: string
    description: string
}

export type ReportsState = {
    list: ReportData[]
}

export type EditReport = {
    id: string
    images: Image[]
    name: string
    date: string
    price: number
    category: string
    place: string
    station: string
    rate: number | null
    url: string
    description: string
}

// Actions
export type FetchReportsAction = {
    type: typeof FETCH_REPORTS
    payload: ReportsState
}

export type ReportAction = FetchReportsAction
