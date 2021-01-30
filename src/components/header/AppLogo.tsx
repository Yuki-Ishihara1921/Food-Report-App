import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: '2px 20px',
        background: 'cornflowerblue',
        boxShadow: '0px 0px 0px 3px #555',
        borderRadius: '20px',
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            fontSize: 15
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: 20
        }
    }
}))

const AppLogo: FC = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    return (
        <span
            className={classes.root}
            onClick={() => dispatch(push('/'))}
        >
            Food Report
        </span>
    )
}

export default AppLogo