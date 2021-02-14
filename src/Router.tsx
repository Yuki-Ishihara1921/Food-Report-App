import React, { FC } from 'react'
import { Switch, Route } from 'react-router'
import Auth from './Auth'
import { SignIn, SignUp, ReportList, ReportDetail, ReportEdit } from './pages'

const Router: FC = () => {
    return (
        <Switch>
            <Route exact path={'/signin'} component={SignIn} />
            <Route exact path={'/signup'} component={SignUp} />
            <Auth>
                <Route exact path={'(/)?'} component={ReportList} />
                <Route exact path={'/reports/:id'} component={ReportDetail} />
                <Route path={'/report/edit(/:id)?'} component={ReportEdit} />
            </Auth>
        </Switch>
    )
}

export default Router