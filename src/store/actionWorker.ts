import {
  InventoryItem,
  ActionType,
  State,
  InitialState,
  ErrorMsgs,
  ErrorBoundaries,
  Worker,
  Route,
} from '../constants.js'
import errorHandler from '../util/errorHandler.js'
import Store from './index.js'
import localStorageReducer from './localStorageReducer.js'
import Actions from './actions.js'
import { saveCoinsCalculator } from '../service/coinCalculator.js'

type ActionMapper = Record<ActionType, Worker>

const actionWorkers = (store: Store): ActionMapper => ({
  [Actions.init]: () => {
    const storedState = (localStorageReducer.getAll() || {}) as State
    store.setValue({ ...InitialState, ...storedState }, false)
  },
  [Actions.route_change]: (route: Route) => {
    store.setValue({ route })
  },
  [Actions.inventory_setProduct]: (newProduct: InventoryItem) => {
    const inventoryMap = new Map(
      ((store.get('inventory') || []) as InventoryItem[]).map(inventory => [inventory.name, inventory]),
    )
    inventoryMap.set(newProduct.name, newProduct)
    const inventory = [...inventoryMap.values()]
    store.setValue({ inventory })
  },
  [Actions.machine_saveCoins]: (money: number) => {
    const coins = saveCoinsCalculator(store, money)
    store.setValue({ coins })
  },
  [Actions.purchase_chargeCoins]: (money: number) => {
    const charge = ((store.get('charge') || 0) as number) + money
    const coins = saveCoinsCalculator(store, money)
    store.setValue({ charge, coins })
  },
  [Actions.purchase_buyItem]: (itemIndex: number) => {
    const inventory = [...(store.get('inventory') as InventoryItem[])]
    const remains = (store.get('charge') || 0) as number
    const target = inventory[itemIndex]
    if (target.amount > 0 && target.price <= remains) {
      const charge = remains - target.price
      inventory[itemIndex] = { ...target, amount: target.amount - 1 }
      store.setValue({ charge, inventory })
    }
  },
})

const validator: Partial<ActionMapper> = {
  [Actions.inventory_setProduct]: ({ name, amount, price }: InventoryItem) => {
    let errorMsg: string | null = null
    if (name.match(/\s/)) errorMsg = ErrorMsgs.inventory_SpaceBetween
    if (price < ErrorBoundaries.inventory_PriceMinimum) errorMsg = ErrorMsgs.inventory_PriceMinimum
    if (price % ErrorBoundaries.inventory_PriceLimit > 0) errorMsg = ErrorMsgs.inventory_PriceLimit
    if (amount < ErrorBoundaries.inventory_AmountMinimum) errorMsg = ErrorMsgs.inventory_AmountMinimum
    if (errorMsg) throw Error(errorMsg)
    return true
  },
  [Actions.machine_saveCoins]: (money: number) => {
    let errorMsg: string | null = null
    if (money < ErrorBoundaries.machine_PriceMinimum) errorMsg = ErrorMsgs.machine_PriceMinimum
    if (money % ErrorBoundaries.machine_PriceLimit > 0) errorMsg = ErrorMsgs.machine_PriceLimit
    if (errorMsg) throw Error(errorMsg)
    return true
  },
}

const actionWorkersWithValidator = (store: Store) => {
  const worker = actionWorkers(store)

  return (actionType: ActionType) => {
    const validChecker = validator[actionType]
    const dispatcher = worker[actionType]

    return (data: unknown) => {
      try {
        if (validChecker) validChecker(data)
        dispatcher(data)
      } catch (err) {
        errorHandler(`actionWorkers@${actionType}`, err)
      }
    }
  }
}

export default actionWorkersWithValidator
