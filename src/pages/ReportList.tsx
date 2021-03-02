import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { RootState } from '../reducks/store'
import { fetchReports } from '../reducks/reports/operations'
import { Launch } from '@material-ui/icons'
import { ReportCard } from '../components/reports'
import { ButtonPrimary } from '../components/UIkit'

const ReportList: FC = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state: RootState) => state)
    const uid = selector.users.uid
    const reports = selector.reports.list
    const query = selector.router.location.search
    const category = /^\?category=/.test(query) ? query.split('?category=')[1] : ''

    useEffect(() => {
        dispatch(fetchReports(uid, category))
    }, [query])

    return (
        <div className="reportPage">
            <h2 className="text-headline">食レポ一覧</h2>
            <div className="reportPage_container">
                {reports.length > 0 ? (
                    reports.map(report => (
                        <ReportCard
                            key={report.id} id={report.id} name={report.name} 
                            images={report.images} rate={report.rate}
                        />
                    ))
                ) : (
                    <ButtonPrimary
                        startIcon={<Launch />}
                        label={"新規作成"}
                        onClick={() => dispatch(push('/report/edit'))}
                    />
                )}
            </div>
        </div>
    )
}

export default ReportList
 