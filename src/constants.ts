import { Actions } from './store/actions.js'
import Store from './store/index.js'

export const ErrorBoundaries = {
  inventory_PriceMinimum: 100,
  inventory_PriceLimit: 10,
  inventory_AmountMinimum: 1,
  machine_PriceMinimum: 100,
  machine_PriceLimit: 10,
}

export const ErrorMsgs = {
  inventory_spaceBetween: '공백 불가',
  inventory_PriceMinimum: `최소금액은 ${ErrorBoundaries.inventory_PriceMinimum}원`,
  inventory_PriceLimit: `${ErrorBoundaries.inventory_PriceLimit}원 이하 입력 불가`,
  inventory_AmountMinimum: `수량은 ${ErrorBoundaries.inventory_AmountMinimum}개 이상`,
  machine_PriceMinimum: `충전금액은 최소 ${ErrorBoundaries.machine_PriceMinimum}원 이상`,
  machine_PriceLimit: `${ErrorBoundaries.machine_PriceLimit}원 이하 입력 불가`,
  machine_CalculateError: '동전교환 후에도 잔액이 남은건 뭔가 문제가 있다는 뜻',
  store_initError: 'unable to initialize store',
}

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

export enum CoinKey {
  total = 'total',
  q500 = 'q500',
  q100 = 'q100',
  q50 = 'q50',
  q10 = 'q10',
}

export type Coins = {
  [CoinKey.total]: number
  [CoinKey.q500]: number
  [CoinKey.q100]: number
  [CoinKey.q50]: number
  [CoinKey.q10]: number
}

export const CoinKeys = [CoinKey.total, CoinKey.q500, CoinKey.q100, CoinKey.q50, CoinKey.q10]
export const CoinValues = Object.freeze([500, 100, 50, 10])

export enum StateKey {
  route = 'route',
  inventory = 'inventory',
  saving = 'saving',
}

export type State = {
  [StateKey.route]: Route
  [StateKey.inventory]: InventoryItem[]
  [StateKey.saving]: Coins
}

export const StateKeys = [StateKey.route, StateKey.inventory, StateKey.saving]

export const InitialState = {
  [StateKey.route]: Route.productInventory,
  [StateKey.inventory]: [],
  [StateKey.saving]: {
    [CoinKey.total]: 0,
    [CoinKey.q500]: 0,
    [CoinKey.q100]: 0,
    [CoinKey.q50]: 0,
    [CoinKey.q10]: 0,
  },
}

export type AnyObj = { [key: string]: any }
export type StrObj = { [key: string]: string }
export type Elem = HTMLElement | string

export type PartialState = Partial<State>

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
