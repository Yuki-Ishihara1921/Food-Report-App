import React, { FC } from 'react'
import { TextField, InputAdornment } from '@material-ui/core'
import { ChangeEvent } from '../../types'

type Props = {
    margin: string
    width: string
    label: string
    multiline: boolean
    required: boolean
    rows: number
    value: string | number
    type: string
    variant: "standard" | "filled" | "outlined" | undefined
    icon: string | JSX.Element
    onChange: (e: ChangeEvent) => void
}

const TextInput: FC<Props> = ({margin, width, label, multiline, required, rows, value, type, variant, icon, onChange}) => {
    return (
        <div style={{margin: margin}}>
            <TextField
                style={{width: width}}
                label={label}
                margin="dense"
                multiline={multiline}
                required={required}
                rows={rows}
                value={value}
                type={type}
                variant={variant}
                InputProps={{
                    startAdornment: <InputAdornment position="start">{icon}</InputAdornment>
                }}
                onChange={onChange}
            />
        </div>
    )
}

export default TextInput
