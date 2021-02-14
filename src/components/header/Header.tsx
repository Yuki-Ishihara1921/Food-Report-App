import React, { FC, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../reducks/store'
import { makeStyles, AppBar, Toolbar, IconButton } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { AppLogo, SideBarDrawer } from './'
import { ClickEvent } from '../../types'

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

    const [sideBarOpen, setSideBarOpen] = useState<boolean>(false)

    const handleDrawerToggle = useCallback((e: ClickEvent, isOpen: boolean) => {
        if ((e as KeyboardEvent).type === 'keydown' && ((e as KeyboardEvent).key === 'Tab' || (e as KeyboardEvent).key === 'Shift')) {
            return
        }
        setSideBarOpen(isOpen)
    }, [setSideBarOpen])

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <AppLogo />
                    {isSignedIn && (
                        <>
                            <IconButton
                                className={classes.iconButton}
                                onClick={(e) => handleDrawerToggle(e, true)}
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