import {
  AnyObj,
  InventoryItem,
  Dispatcher,
  ActionType,
  State,
  StateKey,
  InitialState,
  CoinKeys,
  ErrorMsgs,
} from '../constants.js'
import errorHandler from '../util/errorHandler.js'
import Store from './index.js'
import localStorageReducer from './localStorageReducer.js'
import Actions from './actions.js'
import { chargeCalculator } from '../service/coinCalculator.js'

const saveCoinsToMachine = (store: Store, { money }: any) => {
  const coins = { ...(store.get('coins') as any) }
  const res = chargeCalculator(money)
  CoinKeys.forEach((key, i) => {
    coins[key] += res[i]
  })
  return coins
}

const actionWorker: { [key: string]: Dispatcher } = {
  [Actions.init]: store => {
    const storedState = (localStorageReducer.getAll() || {}) as State
    store.setValue({ ...InitialState, ...storedState }, false)
  },
  [Actions.route_change]: (store, { route }) => {
    store.setValue({ route })
  },
  [Actions.inventory_setProduct]: (store, newProduct: InventoryItem) => {
    if (!validator[Actions.inventory_setProduct](newProduct)) return
    const inventoryMap = new Map(
      ((store.get('inventory') || []) as InventoryItem[]).map(inventory => [inventory.name, inventory]),
    )
    inventoryMap.set(newProduct.name, newProduct)
    const inventory = [...inventoryMap.values()]
    store.setValue({ inventory })
  },
  [Actions.machine_saveCoins]: (store, data) => {
    const coins = saveCoinsToMachine(store, data)
    store.setValue({ coins })
  },
  [Actions.purchase_chargeCoins]: (store, data) => {
    const charge = ((store.get('charge') || 0) as number) + data.money
    const coins = saveCoinsToMachine(store, data)
    store.setValue({ charge, coins })
  },
  [Actions.purchase_buyItem]: (store, { itemIndex }) => {
    const inventory = [...(store.get('inventory') as InventoryItem[])]
    const remains = (store.get('charge') || 0) as number
    const target = inventory[itemIndex]
    if (target.amount > 0 && target.price <= remains) {
      const charge = remains - target.price
      inventory[itemIndex] = { ...target, amount: target.amount - 1 }
      store.setValue({ charge, inventory })
    }
  },
}

const validator = {
  [Actions.inventory_setProduct]: ({ name, amount, price }: InventoryItem) => {
    let errorMsg: string | null = null
    if (name.match(/\s/)) errorMsg = ErrorMsgs.inventory_spaceBetween
    if (price < 100) errorMsg = ErrorMsgs.inventory_PriceMinimum
    if (price % 10 > 0) errorMsg = ErrorMsgs.inventory_PriceLimit
    if (amount <= 0) errorMsg = ErrorMsgs.inventory_AmountMinimum
    if (errorMsg) throw Error(errorMsg)
    return true
  },
}

const actionWorkerWithValidation = (dispatcher: Dispatcher, actionType: ActionType) => (store: Store, data: AnyObj) => {
  try {
    dispatcher(store, data)
  } catch (err) {
    errorHandler(`actionWorker@${actionType}`, err)
  }
}

export default (actionType: ActionType) => {
  const workerItem = actionWorker[actionType]
  if (!workerItem) return () => {}
  return actionWorkerWithValidation(workerItem, actionType)
}
