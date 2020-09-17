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
    generateNew () {
      const wallet = WalletState.generateNew()
      context.setWallet(wallet)
      return wallet
    },
    fromPrivateKey (privateKey) {
      const wallet = WalletState.fromPrivateKey(privateKey)
      context.setWallet(wallet)
      return wallet
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
