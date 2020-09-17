import React from 'react'
import { Redirect } from 'react-router-dom'
import { useWallet } from './WalletContext'

export default function WalletDashboard () {
  const { wallet } = useWallet()

  if (wallet == null) {
    return <Redirect to='/' />
  }

  return (
    <div>
      WalletDashboard
    </div>
  )
}
