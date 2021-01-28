import React, { FC } from 'react'
import { makeStyles, Button } from '@material-ui/core'

type Props = {
    startIcon: string | JSX.Element
    label: string
    onClick: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
}

const useStyles = makeStyles({
    root: {
        margin: 25
    }
})

const SaveButton: FC<Props> = ({startIcon, label, onClick}) => {
    const classes = useStyles()
    return (
        <Button
            className={classes.root}
            color="primary"
            startIcon={startIcon}
            variant="contained"
            onClick={onClick}
        >
            {label}
        </Button>
    )
}

export default SaveButton
