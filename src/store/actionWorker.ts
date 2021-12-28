import {
  InventoryItem,
  ActionType,
  State,
  InitialState,
  ErrorMsgs,
  ErrorBoundaries,
  Worker,
  Route,
  InitialCoins,
} from '../constants.js'
import errorHandler from '../util/errorHandler.js'
import Store from './index.js'
import localStorageReducer from './localStorageReducer.js'
import Actions from './actions.js'
import { saveCoinsCalculator, changeCoinsCalculator } from '../service/coinCalculator.js'

const actionWorkers = (store: Store): Record<ActionType, Worker> => ({
  [Actions.init]: () => {
    const storedState = (localStorageReducer.getAll() || {}) as State
    store.setValue({ ...InitialState, ...storedState }, false)
  },
  [Actions.route_change]: (route: Route) => {
    store.setValue({ route, changeCoins: InitialCoins })
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
    const ownedCoins = saveCoinsCalculator(store, money)
    store.setValue({ ownedCoins })
  },
  [Actions.user_chargeCoins]: (money: number) => {
    const charge = ((store.get('charge') || 0) as number) + money
    const ownedCoins = saveCoinsCalculator(store, money)
    store.setValue({ charge, ownedCoins, changeCoins: InitialCoins })
  },
  [Actions.user_buyItem]: (itemIndex: number) => {
    const inventory = [...(store.get('inventory') as InventoryItem[])]
    const remains = (store.get('charge') || 0) as number
    const target = inventory[itemIndex]
    if (target.amount > 0 && target.price <= remains) {
      const charge = remains - target.price
      inventory[itemIndex] = { ...target, amount: target.amount - 1 }
      store.setValue({ charge, inventory })
    }
  },
  [Actions.user_returnCoins]: () => {
    const { charge, ownedCoins, changeCoins } = changeCoinsCalculator(store)
    store.setValue({ charge, ownedCoins, changeCoins })
  },
})

const validator: Partial<Record<ActionType, (data: unknown) => string | null>> = {
  [Actions.inventory_setProduct]: ({ name, amount, price }: InventoryItem) => {
    if (name.match(/\s/)) return ErrorMsgs.inventory_SpaceBetween
    if (price < ErrorBoundaries.inventory_PriceMinimum) return ErrorMsgs.inventory_PriceMinimum
    if (price % ErrorBoundaries.inventory_PriceLimit > 0) return ErrorMsgs.inventory_PriceLimit
    if (amount < ErrorBoundaries.inventory_AmountMinimum) return ErrorMsgs.inventory_AmountMinimum
    return null
  },
  [Actions.machine_saveCoins]: (money: number) => {
    if (money < ErrorBoundaries.machine_PriceMinimum) return ErrorMsgs.machine_PriceMinimum
    if (money % ErrorBoundaries.machine_PriceLimit > 0) return ErrorMsgs.machine_PriceLimit
    return null
  },
  [Actions.user_chargeCoins]: (money: number) => {
    if (money < ErrorBoundaries.user_PriceMinimum) return ErrorMsgs.user_PriceMinimum
    return null
  },
}

const actionWorkersWithValidator = (store: Store) => {
  const worker = actionWorkers(store)

  return (actionType: ActionType) => {
    const validChecker = validator[actionType] || (() => null)
    const dispatcher = worker[actionType]

    return (data: unknown) => {
      try {
        const errorMsg = validChecker(data)
        if (errorMsg) throw new Error(errorMsg)
        dispatcher(data)
      } catch (err) {
        errorHandler(`actionWorkers@${actionType}`, err)
      }
    }
  }
}

export default actionWorkersWithValidator
