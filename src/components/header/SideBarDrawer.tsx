import React, { FC, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { signOut } from '../../reducks/users/operations'
import { Event } from './Header'
import { db } from '../../firebase'
import { makeStyles, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core'
import { ExitToApp, Launch } from '@material-ui/icons'

type Props = {
    open: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    onClose: (event: Event, isOpen: boolean) => void
}

type Filter = {
    id: string
    label: string
    path: string
    func: (event: Event, path: string) => void
}

const useStyles = makeStyles({
    root: {
        width: 200
    }
})

const SideBarDrawer: FC<Props> = ({open, setIsOpen, onClose}) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const selectMenu = (event: Event, path: string) => {
        dispatch(push(path))
        onClose(event, false)
    }

    const [filters, setFilters] = useState<Filter[]>([
        {id: 'all', label: 'すべて', path: '/', func: selectMenu}
    ])

    const handleLogout = () => {
        dispatch(signOut())
        setIsOpen(false)
    }

    const handleEditPageOpen = () => {
        dispatch(push('/report/edit'))
        setIsOpen(false)
    }

    useEffect(() => {
        db.collection('categories').orderBy('order', 'asc').get()
        .then((snapshots) => {
            const list: Filter[] = []
            snapshots.forEach((snapshot) => {
                const category = snapshot.data()
                if (category) {
                    list.push({
                        id: category.id,
                        label: category.name,
                        path: `/?category=${category.name}`,
                        func: selectMenu
                    })
                }
            })
            setFilters((prevState) => [...prevState, ...list])
        })
    }, [])

    return (
        <Drawer
            open={open}
            anchor={"right"}
            onClose={(e) => onClose(e, false)}
            classes={{paper: classes.root}}
            ModalProps={{keepMounted: true}}
        >
            <List>
                <ListItem button key="logout" onClick={handleLogout}>
                    <ListItemIcon>
                        <ExitToApp />
                    </ListItemIcon>
                    <ListItemText primary="ログアウト" />
                </ListItem>
                <Divider />
                <ListItem button key="newReport" onClick={handleEditPageOpen}>
                    <ListItemIcon>
                        <Launch />
                    </ListItemIcon>
                    <ListItemText primary="新規作成" />
                </ListItem>
            </List>
            <Divider />
            <List>
                {filters.map((filter: Filter) => (
                    <ListItem button key={filter.id} onClick={(e) => selectMenu(e, filter.path)}>
                        <ListItemText primary={filter.label} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}

export default SideBarDrawer
