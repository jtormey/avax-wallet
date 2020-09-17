import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as walletStore from './wallet/wallet-store'
import { useWallet } from './WalletContext'

export default function GenerateWallet () {
  const context = useWallet()
  const history = useHistory()

  const [privateKey, setPrivateKey] = useState('')
  const [persist, setPersist] = useState(false)
  const [error, setError] = useState(false)

  function handleSubmit () {
    try {
      const wallet = context.fromPrivateKey(privateKey.trim())
      if (persist) {
        walletStore.persist(wallet)
      }
      history.push('/wallet')
    } catch (e) {
      console.error(e)
      setError(true)
    }
  }

  function handleChangePrivateKey (event) {
    setPrivateKey(event.target.value)
  }

  function handleChangePersist (event) {
    setPersist(event.target.checked)
  }

  return (
    <div className='sm:w-1/2 mx-4 sm:mx-auto py-16'>
      <div className='bg-white border border-gray-200 px-8 py-8'>
        <h1 className='text-lg mb-2'>
          Import private key
        </h1>

        <div className='border-b border-gray-200 pb-4 mb-4'>
          <textarea value={privateKey} onChange={handleChangePrivateKey} rows='3' className='bg-gray-50 focus:outline-none focus:shadow-outline border border-gray-200 py-2 px-4 block w-full appearance-none' />

          {error && (
            <div className='mt-2'>
              <span className='text-sm text-orange-300'>
                Failed to import private key
              </span>
            </div>
          )}
        </div>

        <div className='flex flex-col sm:flex-row sm:items-center justify-between'>
          <button onClick={handleSubmit} className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4'>
            Import wallet key
          </button>

          <div className='mt-4 sm:mt-0'>
            <input id='import_wallet_checkbox' type='checkbox' value={persist} onChange={handleChangePersist} />
            <label htmlFor='import_wallet_checkbox' className='text-sm text-gray-400 ml-2'>
              Save this wallet in my browser
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
