import React, { FC } from 'react'
import { makeStyles, InputAdornment, TextField } from '@material-ui/core'
import { ChangeEvent } from '../../types'

type Props = {
    icon: string | JSX.Element
    label: string
    multiline: boolean
    required: boolean
    rows: number
    type: string
    value: string | number
    variant: "standard" | "filled" | "outlined" | undefined
    width: string
    onChange: (e: ChangeEvent) => void
}

const useStyles = makeStyles({
    root: {
        margin: '10px auto',
        background: '#fff'
    }
})

const TextInput: FC<Props> = ({icon, label, multiline, required, rows, type, value, variant, width, onChange}) => {
    const classes = useStyles()
    return (
        <TextField
            className={classes.root}
            label={label}
            margin="dense"
            multiline={multiline}
            required={required}
            rows={rows}
            style={{width: width}}
            type={type}
            value={value}
            variant={variant}
            InputProps={{
                startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
                inputProps: { min: 0 }
            }}
            onChange={onChange}
        />
    )
}

export default TextInput
