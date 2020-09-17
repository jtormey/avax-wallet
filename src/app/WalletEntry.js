import React, { useMemo } from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as walletStore from './wallet/wallet-store'
import { useWallet } from './WalletContext'

export default function WalletEntry () {
  const history = useHistory()
  const context = useWallet()
  const { wallets } = useMemo(() => walletStore.list(), [])

  function handleOpenExisting (privateKey) {
    context.fromPrivateKey(privateKey.trim())
    history.push('/wallet')
  }

  function handleRemoveExisting (address) {
    walletStore.remove(address)
    window.location.reload()
  }

  return (
    <div className='sm:w-1/3 flex flex-col py-16 mx-4 sm:mx-auto'>
      <Link to='/generate'>
        <GenerateNew />
      </Link>

      <Link to='/import'>
        <LoadExisting />
      </Link>

      <WalletsDivider />

      {wallets.length ? (
        wallets.map((wallet) => (
          <ExistingWallet
            key={wallet.address}
            address={wallet.address}
            onClick={() => handleOpenExisting(wallet.privateKey)}
            onRemove={() => handleRemoveExisting(wallet.address)}
          />
        ))
      ) : (
        <NoWalletsNotice />
      )}
    </div>
  )
}

function GenerateNew () {
  return (
    <div className='border border-blue-500 bg-blue-500 px-10 py-6 mb-6'>
      <span className='text-lg text-white'>
        Generate a new wallet <span className='float-right'>›</span>
      </span>
    </div>
  )
}

function LoadExisting () {
  return (
    <div className='border border-blue-500 bg-white cursor-pointer px-10 py-6 mb-6'>
      <span className='text-lg text-blue-500'>
        Load wallet from a private key <span className='float-right'>›</span>
      </span>
    </div>
  )
}

function WalletsDivider () {
  return (
    <div className='flex items-center mb-6'>
      <div className='border-b border-gray-400 flex-grow' />
      <span className='text-sm text-gray-400 mx-6 pb-1'>or chooose an existing wallet</span>
      <div className='border-b border-gray-400 flex-grow' />
    </div>
  )
}

function NoWalletsNotice () {
  return (
    <div className='border border-dashed border-gray-400 bg-gray-50 px-10 py-6 text-center mb-6'>
      <span className='text-lg text-gray-400'>
        No existing wallets to load
      </span>
    </div>
  )
}

function ExistingWallet ({ address, onClick, onRemove }) {
  function handleRemove (event) {
    event.stopPropagation()
    onRemove()
  }

  return (
    <div className='border border-gray-400 cursor-pointer px-10 py-6 mb-6' onClick={onClick}>
      <span className='text-lg text-gray-400'>
        Existing wallet <span className='text-xs text-red-500 float-right' onClick={handleRemove}>remove</span>
      </span>
      <div className='text-xs text-gray-400 truncate'>
        <span>{address}</span>
      </div>
    </div>
  )
}
