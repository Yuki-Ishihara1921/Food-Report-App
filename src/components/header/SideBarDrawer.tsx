import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { signOut } from '../../reducks/users/operations'
import { makeStyles, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core'
import { ExitToApp, Launch } from '@material-ui/icons'

type Props = {
    open: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    onClose: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void
}

const useStyles = makeStyles({
    root: {
        width: 200
    }
})

const SideBarDrawer: FC<Props> = ({open, setIsOpen, onClose}) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(signOut())
        setIsOpen(false)
    }

    const handleEditPageOpen = () => {
        dispatch(push('/report/edit'))
        setIsOpen(false)
    }

    return (
        <Drawer
            open={open}
            anchor={"right"}
            onClose={onClose(false)}
            classes={{
                paper: classes.root
            }}
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
        </Drawer>
    )
}

export default SideBarDrawer
