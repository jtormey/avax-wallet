import { BN } from 'avalanche'
import BigNumber from 'bignumber.js'
import avax, { getAssetID } from './avax'

const denomination = new BigNumber(1000000000)

function renderBalance (balance) {
  return new BigNumber(balance).dividedBy(denomination).toFixed(9).replace(/\.?0+$/, '')
}

export default class WalletState {
  constructor (xchain, address) {
    this._xchain = xchain
    this._address = address
  }

  get address () {
    return this._address.getAddressString()
  }

  get privateKey () {
    return this._address.getPrivateKeyString()
  }

  async getBalance () {
    const assetID = await getAssetID(this._xchain)
    const balance = await this._xchain.getBalance(this.address, assetID)
    return renderBalance(balance.balance)
  }

  async sendAddressAmount (address, amount) {
    const amountBigNumber = new BigNumber(amount).multipliedBy(denomination)
    const amountBN = new BN(amountBigNumber.toFixed(0))

    const addresses = this._xchain.keyChain().getAddressStrings()
    const utxos = await this._xchain.getUTXOs(addresses)

    const assetID = await getAssetID('AVAX')
    const unsignedTx = await this._xchain.buildBaseTx(utxos, amountBN, assetID, [address], addresses, addresses)
    const signedTx = this._xchain.signTx(unsignedTx)
    const txid = await this._xchain.issueTx(signedTx)

    return { txid }
  }

  async getTxAccepted (txid) {
    const txStatus = await this._xchain.getTxStatus(txid)
    return txStatus === 'Accepted'
  }

  static generateNew () {
    const xchain = avax.XChain()
    const address = xchain.keyChain().makeKey()
    return new WalletState(xchain, address)
  }

  static fromPrivateKey (privateKey) {
    const xchain = avax.XChain()
    const address = xchain.keyChain().importKey(privateKey)
    return new WalletState(xchain, address)
  }
}
