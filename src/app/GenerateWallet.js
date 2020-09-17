import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import spinner from '../assets/spinner.gif'
import { useWallet } from './WalletContext'

export default function GenerateWallet () {
  const context = useWallet()

  useEffect(() => { context.generateNew() }, [])

  return (
    <div className='w-1/2 mx-auto py-16'>
      <div className='bg-white border border-gray-200 px-8 py-8'>
        {context.wallet ? <CreatedWallet wallet={context.wallet} /> : (
          <div className='flex items-center justify-center h-32'>
            <img src={spinner} className='w-32 h-32' />
          </div>
        )}
      </div>
    </div>
  )
}

function CreatedWallet ({ wallet }) {
  return (
    <div>
      <h1 className='text-lg mb-2'>
        Your new wallet
      </h1>

      <div className='border-b border-gray-200 pb-4 mb-4'>
        <div className='border border-dashed border-gray-200 p-4 mb-4'>
          <span className='text-sm text-gray-400'>
            {wallet.address}
          </span>
          <br />
          <span className='text-sm text-gray-400'>
            {wallet.privateKey}
          </span>
        </div>
        <span className='text-xs text-orange-300'>
          To ensure you do not lose your funds, please write this information down.
        </span>
      </div>

      <div className='flex items-center justify-between'>
        <Link to='/wallet' className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4'>
          To wallet dashboard
        </Link>

        <div>
          <input id='save_wallet_checkbox' type='checkbox' />
          <label htmlFor='save_wallet_checkbox' className='text-sm text-gray-400 ml-2'>
            Save this wallet in my browser
          </label>
        </div>
      </div>
    </div>
  )
}
