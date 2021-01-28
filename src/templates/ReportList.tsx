import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReports } from '../reducks/reports/operations'
import { RootState } from '../reducks/store/store'
import { ReportCard } from '../components/reports'

const ReportList: FC = () => {
    const dispatch = useDispatch()
    const selectors = useSelector((state: RootState) => state)
    const uid = selectors.users.uid
    const reports = selectors.reports.list

    useEffect(() => {
        dispatch(fetchReports(uid))
    }, [])

    return (
        <div className="reportpage-wrapin">
            <div className="reports-flex">
                {reports.length > 0 && (
                    reports.map(report => (
                        <ReportCard
                            key={report.id} id={report.id} name={report.name} 
                            images={report.images} rate={report.rate}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default ReportList
 