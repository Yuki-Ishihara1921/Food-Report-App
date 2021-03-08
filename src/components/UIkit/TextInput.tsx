import React, { FC } from 'react'
import { makeStyles, InputAdornment, TextField } from '@material-ui/core'
import { ChangeEvent } from '../../types'

type Props = {
    background: string
    icon: string | JSX.Element
    label: string
    margin: "normal" | "none" | "dense" | undefined
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
        margin: '10px auto'
    }
})

const TextInput: FC<Props> = ({background, icon, label, margin, multiline, required, rows, type, value, variant, width, onChange}) => {
    const classes = useStyles()
    return (
        <TextField
            className={classes.root}
            label={label}
            margin={margin}
            multiline={multiline}
            required={required}
            rows={rows}
            style={{width: width, background: background}}
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
