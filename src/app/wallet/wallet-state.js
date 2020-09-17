import { BN } from 'avalanche'
import avax, { getAssetID } from './avax'

window.BN = BN

export function generateNew () {
  const xchain = avax.XChain()
  const keyChain = xchain.keyChain()
  const address = keyChain.makeKey()

  // debugger

  window.xchain = xchain
  window.keyChain = keyChain
  window.address = address

  return {
    xchain,
    address: address.getAddressString(),
    privateKey: address.getPrivateKeyString(),
    async getBalance () {
      const assetID = await getAssetID(xchain)
      const balance = await xchain.getBalance(address.getAddressString(), assetID)
      return balance.balance
    },
    async send (utxos) {
      const amount = new BN(100)
      const to = 'X-avax1k26jvfdzyukms95puxcceyzsa3lzwf5ftt0fjk'
      const addresses = keyChain.getAddressStrings()
      const unsignedTx = await xchain.buildBaseTx(utxos, amount, [to], addresses, addresses, 'AVAX')
      const signedTx = xchain.signTx(unsignedTx)
      const txid = await xchain.issueTx(signedTx)
      return txid
    }
  }
}

export function loadFromMnemonic (mnemonic) {
  return {
    state: 'loaded'
  }
}

export function loadExisting (password) {
  return {
    state: 'loaded'
  }
}
