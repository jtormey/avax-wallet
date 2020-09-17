import React from 'react'

export default function WalletEntry () {
  return (
    <div className='w-1/3 flex flex-col py-32 mx-auto'>
      <GenerateNew />
      <LoadExisting />
      <WalletsDivider />
      <NoWalletsNotice />
      <ExistingWallet address='X-everest1x3xwpq68p7mfpy5rt59mevrj0ccs423ujh76kj' />
    </div>
  )
}

function GenerateNew () {
  return (
    <div className='border border-blue-500 bg-blue-500 cursor-pointer px-10 py-6 mb-6'>
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
        Load wallet from a mnemonic <span className='float-right'>›</span>
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

function ExistingWallet ({ address }) {
  return (
    <div className='border border-gray-400 cursor-pointer px-10 py-6'>
      <span className='text-lg text-gray-400'>
        Existing wallet
      </span>
      <br />
      <span className='text-xs text-gray-400'>
        {address}
      </span>
    </div>
  )
}
