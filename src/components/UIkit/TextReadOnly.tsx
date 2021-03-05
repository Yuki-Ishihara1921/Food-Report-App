import React, { FC } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles, InputAdornment, useMediaQuery, useTheme } from '@material-ui/core'

type Props = {
    icon: string | JSX.Element
    label: string
    multiline: boolean
    value: string | number
    variant: "standard" | "filled" | "outlined" | undefined
    width: string
}

const useStyles = makeStyles({
    root: {
        margin: '10px auto',
        background: '#fff'
    }
})

const TextReadOnly: FC<Props> = ({width, label, multiline, value, variant, icon}) => {
    const classes = useStyles()
    const theme = useTheme()
    const moreWidthSM = useMediaQuery(theme.breakpoints.up('sm'))
    
    return (
        <TextField
            className={classes.root}
            label={label}
            multiline={multiline}
            size={moreWidthSM ? 'medium' : 'small'}
            style={{width: width}}
            value={value}
            variant={variant}
            InputProps={{
                readOnly: true,
                startAdornment: <InputAdornment position="start">{icon}</InputAdornment>
            }}
        />
    )
}

export default TextReadOnly
