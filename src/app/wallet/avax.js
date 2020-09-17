import { Avalanche, BinTools } from 'avalanche'

const BIN_TOOLS = BinTools.getInstance()
const AVA_EXPLORER_ROOT = 'https://explorer.avax.network'

export default new Avalanche('testapi.avax.network', 443, 'https')

export function explorerTxPage (txid) {
  return `${AVA_EXPLORER_ROOT}/tx/${txid}`
}

let assetID = null
export async function getAssetID (xchain) {
  if (assetID == null) {
    const asset = await xchain.getAssetDescription('AVAX')
    assetID = BIN_TOOLS.cb58Encode(asset.assetID)
  }
  return assetID
}
