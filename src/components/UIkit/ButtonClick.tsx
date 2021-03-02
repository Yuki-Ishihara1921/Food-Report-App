import React, { FC } from 'react'
import { makeStyles, Button } from '@material-ui/core'

type Props = {
    startIcon: string | JSX.Element
    color: "inherit" | "default" | "primary" | "secondary" | undefined
    label: string
    onClick: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
}

const useStyles = makeStyles({
    root: {
        margin: '25px'
    }
})

const ButtonClick: FC<Props> = ({startIcon, color, label, onClick}) => {
    const classes = useStyles()
    return (
        <Button
            className={classes.root}
            color={color}
            startIcon={startIcon}
            variant="contained"
            onClick={onClick}
        >
            {label}
        </Button>
    )
}

export default ButtonClick
