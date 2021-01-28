import React, { FC } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles, useTheme, useMediaQuery, InputAdornment } from '@material-ui/core'

type Props = {
    width: string
    label: string
    multiline: boolean
    value: unknown
    variant: "standard" | "filled" | "outlined" | undefined
    icon: string | JSX.Element
}

const useStyles = makeStyles({
    root: {
        margin: '10px auto'
    }
})

const TextReadOnly: FC<Props> = ({width, label, multiline, value, variant, icon}) => {
    const classes = useStyles()
    const theme = useTheme()
    const moreMdWidth = useMediaQuery(theme.breakpoints.up('sm'))
    
    return (
        <TextField
            className={classes.root}
            style={{width: width}}
            label={label}
            multiline={multiline}
            size={moreMdWidth ? 'medium' : 'small'}
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