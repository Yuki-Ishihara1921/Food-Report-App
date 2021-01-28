import React from 'react'
import Router from './Router'
import { Header } from './components/header'

const App = () => {
  return (
    <>
      <Header />
      <div className="page-main">
        <Router />
      </div>
    </>
  )
}

export default App
