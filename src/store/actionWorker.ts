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
  ErrorBoundaries,
} from '../constants.js'
import errorHandler from '../util/errorHandler.js'
import Store from './index.js'
import localStorageReducer from './localStorageReducer.js'
import { Actions } from './actions.js'
import { chargeCalculator } from '../service/coinCalculator.js'

const actionWorker: { [key: string]: Dispatcher } = {
  [Actions.init]: store => {
    const storedState = (localStorageReducer.getAll() || {}) as State
    store.setValue({ ...InitialState, ...storedState }, false)
  },
  [Actions.route_change]: (store, { route }) => {
    store.setValue({ route })
  },
  [Actions.inventory_addProduct]: (store, newProduct: InventoryItem) => {
    if (!validator[Actions.inventory_addProduct](newProduct)) return
    const inventoryMap = new Map(
      ((store.get(StateKey.inventory) || []) as InventoryItem[]).map(inventory => [inventory.name, inventory]),
    )
    inventoryMap.set(newProduct.name, newProduct)
    const inventory = [...inventoryMap.values()]
    store.setValue({ inventory })
  },
  [Actions.machine_addSaving]: (store, { money }) => {
    if (!validator[Actions.machine_addSaving](money)) return
    const saving = { ...(store.get(StateKey.saving) as any) }
    const res = chargeCalculator(money)

    CoinKeys.forEach((key, i) => {
      saving[key] += res[i]
    })
    store.setValue({ saving })
  },
}

const validator = {
  [Actions.inventory_addProduct]: ({ name, amount, price }: InventoryItem) => {
    let errorMsg: string | null = null
    if (name.match(/\s/)) errorMsg = ErrorMsgs.inventory_spaceBetween
    if (price < ErrorBoundaries.inventory_PriceMinimum) errorMsg = ErrorMsgs.inventory_PriceMinimum
    if (price % ErrorBoundaries.inventory_PriceLimit > 0) errorMsg = ErrorMsgs.inventory_PriceLimit
    if (amount < ErrorBoundaries.inventory_AmountMinimum) errorMsg = ErrorMsgs.inventory_AmountMinimum
    if (errorMsg) throw Error(errorMsg)
    return true
  },
  [Actions.machine_addSaving]: (money: number) => {
    let errorMsg: string | null = null
    if (money < ErrorBoundaries.machine_PriceMinimum) errorMsg = ErrorMsgs.machine_PriceMinimum
    if (money % ErrorBoundaries.machine_PriceLimit > 0) errorMsg = ErrorMsgs.machine_PriceLimit
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
