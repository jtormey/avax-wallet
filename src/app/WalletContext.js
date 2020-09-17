import React, { useState, useContext, createContext } from 'react'
import WalletState from './wallet/wallet-state'

const Context = createContext({ wallet: null })

export function useWallet () {
  const context = useContext(Context)

  return {
    wallet: context.wallet,
    balance: context.balance,
    async refresh () {
      context.setBalance(await context.wallet.getBalance())
    },
    async generateNew () {
      context.setWallet(WalletState.generateNew())
    },
    async fromPrivateKey (privateKey) {
      context.setWallet(WalletState.fromPrivateKey(privateKey))
    }
  }
}

export default function WalletContext ({ children }) {
  const [wallet, setWallet] = useState(null)
  const [balance, setBalance] = useState(null)
  return (
    <Context.Provider value={{ wallet, setWallet, balance, setBalance }}>
      {children}
    </Context.Provider>
  )
}
