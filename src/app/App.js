import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import WalletContext from './WalletContext'
import WalletEntry from './WalletEntry'
import WalletDashboard from './WalletDashboard'
import GenerateWallet from './GenerateWallet'
import ImportWallet from './ImportWallet'

export default function App () {
  return (
    <Router>
      <WalletContext>
        <div className='container mx-auto'>
          <Switch>
            <Route path='/generate'>
              <GenerateWallet />
            </Route>
            <Route path='/import'>
              <ImportWallet />
            </Route>
            <Route path='/wallet'>
              <WalletDashboard />
            </Route>
            <Route path='/'>
              <WalletEntry />
            </Route>
          </Switch>
        </div>
      </WalletContext>
    </Router>
  )
}
