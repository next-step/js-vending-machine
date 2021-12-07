import { Actions } from './store/actions.js'
import Store from './store/index.js'

export type AnyObj = { [key: string]: any }
export type StrObj = { [key: string]: string }
export type Elem = HTMLElement | string

export enum Route {
  machineCharge = 'machineCharge',
  productInventory = 'productInventory',
  userPurchase = 'userPurchase',
}

export type InventoryItem = {
  name: string
  price: number
  amount: number
}

export enum StateKey {
  route = 'route',
  inventory = 'inventory',
}

export type State = {
  [StateKey.route]: Route
  [StateKey.inventory]: InventoryItem[]
}

export const StateKeys = [StateKey.route, StateKey.inventory]

export type PartialState = Partial<State>

export const InitialState = {
  [StateKey.route]: Route.productInventory,
  [StateKey.inventory]: [],
}

type Dispatch = {
  actionType: typeof Actions
  data: AnyObj
}

export type DispatchEvent = CustomEvent & {
  detail: Dispatch
}

export type Dispatcher = (store: Store, data: AnyObj) => void
export type Worker = (actionType: keyof typeof Actions) => Dispatcher
export type ActionType = keyof typeof Actions
