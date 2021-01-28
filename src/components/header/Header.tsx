import React, { FC, useState, KeyboardEvent, MouseEvent } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../reducks/store/store'
import { makeStyles, AppBar, Toolbar, IconButton } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import AppLogo from './AppLogo'
import SideBarDrawer from './SideBarDrawer'

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    appBar: {
        background: 'aliceblue'
    },
    iconButton: {
        margin: '0 0 0 auto'
    }
})

const Header: FC = () => {
    const classes = useStyles()
    const selector = useSelector((state: RootState) => state)
    const isSignedIn = selector.users.isSignedIn
    const [sideBarOpen, setSideBarOpen] = useState(false)

    const handleDrawerToggle = (isOpen: boolean) => (e: KeyboardEvent | MouseEvent) => {
        if (e.type === 'keydown' && ((e as KeyboardEvent).key === 'Tab' || (e as KeyboardEvent).key === 'Shift')) {
            return
        }
        setSideBarOpen(isOpen)
    }

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <AppLogo />
                    {isSignedIn && (
                        <>
                            <IconButton
                                className={classes.iconButton}
                                onClick={handleDrawerToggle(true)}
                            >
                                <Menu />
                            </IconButton>
                            <SideBarDrawer
                                open={sideBarOpen}
                                setIsOpen={setSideBarOpen}
                                onClose={handleDrawerToggle}
                            />
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header