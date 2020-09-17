import React, { useState, useContext, createContext } from 'react'
import { generateNew } from './wallet/wallet-state'

const Context = createContext({ wallet: null })

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time))

export function useWallet () {
  const context = useContext(Context)

  return {
    wallet: context.wallet,
    async generateNew () {
      await sleep(1000)
      context.setWallet(generateNew())
    }
  }
}

export default function WalletContext ({ children }) {
  const [wallet, setWallet] = useState(null)
  return (
    <Context.Provider value={{ wallet, setWallet }}>
      {children}
    </Context.Provider>
  )
}
