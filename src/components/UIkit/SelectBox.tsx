import React, { FC } from 'react'
import { Category } from '../../reducks/reports/types'
import { makeStyles, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'

type Props = {
    label: string
    options: Category[]
    required: boolean
    value: string
    select: React.Dispatch<React.SetStateAction<string>>
}

const useStyles = makeStyles({
    root: {
        width: 175,
        margin: '7px auto',
        background: 'none'
    }
})

const SelectBox: FC<Props> = ({label, options, required, value, select}) => {
    const classes = useStyles()
    return (
        <FormControl className={classes.root}>
            <InputLabel>{label}</InputLabel>
            <Select
                required={required}
                value={value}
                variant="standard"
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
