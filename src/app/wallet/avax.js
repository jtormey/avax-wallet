import { Avalanche, BinTools } from 'avalanche'

const bintools = BinTools.getInstance()

export default new Avalanche('testapi.avax.network', 443, 'https')

let assetID = null
export async function getAssetID (xchain) {
  if (assetID == null) {
    const asset = await xchain.getAssetDescription('AVAX')
    assetID = bintools.cb58Encode(asset.assetID)
  }
  return assetID
}
