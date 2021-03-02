import React, { FC, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { RootState } from '../../reducks/store'
import { signOut } from '../../reducks/users/operations'
import { makeStyles, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@material-ui/core'
import { ExitToApp, Launch } from '@material-ui/icons'
import { ClickEvent } from '../../types'
import { db } from '../../firebase'

type Props = {
    open: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    onClose: (event: ClickEvent, isOpen: boolean) => void
}

type Filter = {
    id: string
    label: string
    path: string
    func: (event: ClickEvent, path: string) => void
}

const useStyles = makeStyles({
    root: {
        width: 200
    },
    username: {
        margin: 'auto'
    }
})

const SideBarDrawer: FC<Props> = ({open, setIsOpen, onClose}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state: RootState) => state)
    const username = selector.users.username

    const selectMenu = (event: ClickEvent, path: string) => {
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
            classes={{paper: classes.root}}
            open={open}
            anchor={"right"}
            onClose={(e) => onClose(e, false)}
            ModalProps={{keepMounted: true}}
        >
            <List>
                <ListItem key="username">
                    <Typography className={classes.username} color={"primary"} variant={"h6"}>
                        {username}
                    </Typography>
                </ListItem>
                <Divider />
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
