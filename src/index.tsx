import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import * as History from 'history'
import createStore from './reducks/store/store'
import reportWebVitals from './reportWebVitals'

const history = History.createBrowserHistory()
const store = createStore(history)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals()
