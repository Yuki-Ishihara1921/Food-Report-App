import React, { FC } from 'react'
import { Category } from '../../reducks/reports/types'
import { makeStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

type Props = {
    label: string
    options: Category[]
    required: boolean
    value: string
    select: React.Dispatch<React.SetStateAction<string>>
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 150
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}))

const SelectBox: FC<Props> = ({label, options, required, value, select}) => {
    const classes = useStyles()
    return (
        <FormControl className={classes.formControl}>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value} required={required}
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => select(String(e.target.value))}
            >
                {options.map((category) => (
                    <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectBox
