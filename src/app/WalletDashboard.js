import React, { useState, useEffect } from 'react'
import QRCode from 'react-qr-code'
import { Redirect } from 'react-router-dom'
import { useWallet } from './WalletContext'

export default function WalletDashboard () {
  const context = useWallet()

  if (context.wallet == null) {
    return <Redirect to='/' />
  }

  return (
    <div className='w-1/2 mx-auto py-16'>
      <BalancePanel wallet={context.wallet} />
      <SendPanel wallet={context.wallet} />
    </div>
  )
}

function BalancePanel ({ wallet }) {
  const [balance, setBalance] = useState(null)

  useEffect(() => {
    wallet.getBalance().then((bal) => setBalance(bal))
  }, [])

  return (
    <div className='bg-white border border-gray-200 px-8 py-8 mb-8'>
      <div className='flex justify-between'>
        <div className='flex flex-col justify-between'>
          <h1 className='text-4xl'>
            {balance == null ? (
              <span>...</span>
            ) : (
              <span>{balance} nAVAX</span>
            )}
          </h1>
          <div className=''>
            <span className='text-sm'>Receive to your wallet address</span>
            <br />
            <span className='text-sm text-gray-400'>{wallet.address}</span>
          </div>
        </div>
        <QRCode value={wallet.address} size={128} />
      </div>
    </div>
  )
}

function SendPanel ({ wallet }) {
  return (
    <div className='bg-white border border-gray-200 px-8 py-8 mb-8'>
      <h2 className='text-2xl mb-2'>
        Send
      </h2>
      <div>
        <div className='mb-2'>
          <label htmlFor='to_address' className='text-sm text-gray-400'>
            To address
          </label>
          <input id='to_address' className='bg-gray-50 focus:outline-none focus:shadow-outline border border-gray-200 py-2 px-4 block w-full appearance-none' />
        </div>

        <div className='mb-2'>
          <label htmlFor='to_amount' className='text-sm text-gray-400'>
            Amount to send
          </label>
          <input id='to_amount' className='bg-gray-50 focus:outline-none focus:shadow-outline border border-gray-200 py-2 px-4 block w-full appearance-none' />
        </div>

        <div className='border-b border-gray-200 pb-4 mb-6'>
          <span className='text-sm text-gray-400'>
            Fee: 0.001 AVAX
          </span>
        </div>

        <div>
          <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4'>
            Submit transaction
          </button>
        </div>
      </div>
    </div>
  )
}
