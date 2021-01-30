import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../reducks/store'
import { CircularProgress } from '@material-ui/core'

const Loading: FC = ({children}) => {
    const selector = useSelector((state: RootState) => state)
    const isLoading = selector.loading.state
    const loadingText = selector.loading.text

    return (
        <>
            {isLoading && (
                <section className="c-section__loading">
                    <CircularProgress />
                    <p>{loadingText}</p>
                </section>
            )}
            {children}
        </>
    )
}

export default Loading