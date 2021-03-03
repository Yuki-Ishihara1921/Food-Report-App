import React, { FC, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../reducks/store'
import { AppLogo, SideBarDrawer } from './'
import { ClickEvent } from '../../types'
import { makeStyles, AppBar, IconButton, Toolbar } from '@material-ui/core'
import { Menu } from '@material-ui/icons'

const useStyles = makeStyles({
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
                            onClose={handleDrawerToggle}
                            setIsOpen={setSideBarOpen}
                        />
                    </>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Header
