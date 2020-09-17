import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import spinner from './assets/spinner.gif'

export default function GenerateWallet () {
  const [generated, setGenerated] = useState(false)

  const mnemonic = 'gift palace village frost congress swear rigid alpha essay foster bitter filter into essence endorse small input refuse join model chief lizard topple sun'

  useEffect(() => {
    setTimeout(() => {
      setGenerated(true)
    }, 1000)
  }, [])

  return (
    <div className='w-1/2 mx-auto py-32'>
      <div className='bg-white border border-gray-200 px-8 py-8'>
        {generated ? <CreatedWallet mnemonic={mnemonic} /> : (
          <div className='flex items-center justify-center h-32'>
            <img src={spinner} className='w-32 h-32' />
          </div>
        )}
      </div>
    </div>
  )
}

function CreatedWallet ({ mnemonic }) {
  return (
    <div>
      <h1 className='text-lg mb-2'>
        Your new wallet
      </h1>

      <div className='mb-4'>
        <span className='text-sm text-gray-400'>
          X-everest1x3xwpq68p7mfpy5rt59mevrj0ccs423ujh76kj
        </span>
      </div>

      <div className='border-b border-gray-200 pb-4 mb-6'>
        <h2 className='text-lg mb-2'>
          Your wallet mnemonic
        </h2>
        <ol className='grid grid-cols-6 gap-y-2 mb-2'>
          {mnemonic.split(' ').map((word, i) => (
            <li key={i} className='col-span-1'>
              <span className='text-sm text-gray-400'>
                {i + 1}. {word}
              </span>
            </li>
          ))}
        </ol>
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
          <label for='save_wallet_checkbox' className='text-sm text-gray-400 ml-2'>
            Save this wallet in my browser
          </label>
        </div>
      </div>
    </div>
  )
}
