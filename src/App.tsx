import React, { FC } from 'react'
import Router from './Router'
import { Header } from './components/header'
import { Loading, ScrollToTop } from './components/UIkit'

const App: FC = () => {
  return (
    <Loading>
      <ScrollToTop />
      <Header />
      <div className="page-main">
        <Router />
      </div>
    </Loading>
  )
}

export default App
