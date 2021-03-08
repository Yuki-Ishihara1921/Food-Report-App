import React, { FC } from 'react'
import { Category } from '../../reducks/reports/types'
import { makeStyles, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'

type Props = {
    label: string
    margin: "dense" | "none" | undefined
    options: Category[]
    required: boolean
    value: string
    width: string
    select: React.Dispatch<React.SetStateAction<string>>
}

const useStyles = makeStyles({
    root: {
        margin: '10px auto',
        background: '#fff'
    }
})

const SelectBox: FC<Props> = ({label, margin, options, required, value, width, select}) => {
    const classes = useStyles()
    return (
        <FormControl
            className={classes.root}
            style={{width: width}}
            variant="outlined"
        >
            <InputLabel>{label}</InputLabel>
            <Select
                label={label}
                margin={margin}
                required={required}
                value={value}
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => select(String(e.target.value))}
            >
                {options.map((category) => (
                    <MenuItem key={category.id} value={category.name}>
                        {category.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectBox
