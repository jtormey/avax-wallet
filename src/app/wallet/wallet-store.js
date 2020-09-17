const STORAGE_KEY = 'ava-wallet.local'
const STORAGE_INIT = JSON.stringify({ wallets: [] })

export function list () {
  const storage = window.localStorage.getItem(STORAGE_KEY) || STORAGE_INIT
  return JSON.parse(storage)
}

export function persist (wallet) {
  const storage = list()
  storage.wallets.push({ address: wallet.address, privateKey: wallet.privateKey })
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storage))
}

export function remove (address) {
  const storage = list()
  storage.wallets = storage.wallets.filter((wallet) => wallet.address !== address)
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storage))
}
