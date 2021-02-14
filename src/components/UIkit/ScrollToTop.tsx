import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../reducks/store'

const ScrollToTop: FC = () => {
    const selector = useSelector((state: RootState) => state)
    const pathname = selector.router.location.pathname
    const search = selector.router.location.search

    useEffect(() => {
        try {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'auto'
            })
        } catch (error) {
            window.scrollTo(0, 0)
        }
    }, [pathname, search])

    return null
}

export default ScrollToTop
