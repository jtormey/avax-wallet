import React, { useState, useEffect } from 'react'
import QRCode from 'react-qr-code'
import { Redirect } from 'react-router-dom'
import { sleep } from '../util'
import spinner from '../assets/spinner.gif'
import { explorerTxPage } from './wallet/avax'
import { useWallet } from './WalletContext'

export default function WalletDashboard () {
  const context = useWallet()

  if (context.wallet == null) {
    return <Redirect to='/' />
  }

  return (
    <div className='sm:w-1/2 mx-4 sm:mx-auto py-16'>
      <BalancePanel context={context} />
      <SendPanel context={context} />
    </div>
  )
}

function BalancePanel ({ context }) {
  const wallet = context.wallet

  useEffect(() => { context.refresh() }, [])

  return (
    <div className='bg-white border border-gray-200 px-8 py-8 mb-8'>
      <div className='flex flex-col sm:flex-row items-center sm:items-stretch justify-between'>
        <div className='flex flex-col justify-between w-full sm:w-auto'>
          <h1 className='text-2xl sm:text-4xl'>
            {context.balance == null ? (
              <span>...</span>
            ) : (
              <span>
                {context.balance} AVAX
                <small className='text-sm text-blue-500 cursor-pointer ml-2' onClick={() => context.refresh()}>
                  Refresh
                </small>
              </span>
            )}
          </h1>
          <div className='mb-4 sm:mb-0'>
            <span className='text-sm'>Receive to your wallet address</span>
            <div className='break-words'>
              <span className='text-sm text-gray-400'>{wallet.address}</span>
            </div>
          </div>
        </div>
        <QRCode value={wallet.address} size={128} />
      </div>
    </div>
  )
}

function SendPanel ({ context }) {
  const wallet = context.wallet
  const [toAddress, setToAddress] = useState('')
  const [toAmount, setToAmount] = useState(0)
  const [waiting, setWaiting] = useState(false)
  const [error, setError] = useState(false)

  function handleChangeAddress (event) {
    setToAddress(event.target.value)
  }

  function handleChangeAmount (event) {
    setToAmount(event.target.value)
  }

  async function handleSend () {
    try {
      setError(false)
      setWaiting(true)

      const { txid } = await wallet.sendAddressAmount(toAddress, toAmount)

      while (true) {
        await sleep(1000)
        await context.refresh()
        const accepted = await wallet.getTxAccepted(txid)

        if (accepted) {
          window.open(explorerTxPage(txid), '_blank')
          break
        }
      }
    } catch (e) {
      console.error(e)
      setError(true)
    } finally {
      setToAddress('')
      setToAmount(0)
      setWaiting(false)
    }
  }

  return (
    <div className='relative bg-white border border-gray-200 px-8 py-8 mb-8'>
      <h2 className='text-2xl mb-2'>
        Send
      </h2>
      <div>
        <div className='mb-2'>
          <label htmlFor='to_address' className='text-sm text-gray-400'>
            To address
          </label>
          <input id='to_address' type='text' value={toAddress} onChange={handleChangeAddress} className='bg-gray-50 focus:outline-none focus:shadow-outline border border-gray-200 py-2 px-4 block w-full appearance-none' />
        </div>

        <div className='mb-2'>
          <label htmlFor='to_amount' className='text-sm text-gray-400'>
            Amount to send
          </label>
          <input id='to_amount' type='number' value={toAmount} onChange={handleChangeAmount} className='bg-gray-50 focus:outline-none focus:shadow-outline border border-gray-200 py-2 px-4 block w-full appearance-none' />
        </div>

        <div className='border-b border-gray-200 pb-4 mb-6'>
          <span className='text-sm text-gray-400'>
            Fee: 0.001 AVAX
          </span>
          {error && (
            <div className='mt-2'>
              <span className='text-sm text-orange-300'>
                Failed to send transaction
              </span>
            </div>
          )}
        </div>

        <div>
          <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4' onClick={handleSend}>
            Submit transaction
          </button>
        </div>
      </div>

      {waiting && (
        <div className='absolute inset-0 flex items-center justify-center bg-white opacity-50'>
          <img src={spinner} className='w-32 h-32' />
        </div>
      )}
    </div>
  )
}
