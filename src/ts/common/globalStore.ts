import {
  createStore,
  IAction,
  IMiddleware,
  IReducer,
  IStore,
} from "../core/tiny-redux";
import { ActionType, Config } from "./constants";

interface IGlobalState {
  products: IProduct[];
  changes: IChanges;
}

const defaultGlobalState: IGlobalState = {
  products: [],
  changes: {
    10: 0,
    50: 0,
    100: 0,
    500: 0,
  },
};

export type IChanges = {
  [key: string]: number;
};

export interface IProduct {
  name: string;
  price: number;
  quantity: number;
}

const reducer: IReducer<IGlobalState> = (
  state: IGlobalState,
  action: IAction
) => {
  switch (action.type) {
    case ActionType.addOrUpdateProduct:
      const products = state.products ?? [];
      const product = action.payload as IProduct;
      const idx = products.findIndex((p) => p.name === product.name);
      idx === -1 ? products.push(product) : (products[idx] = product);
      return { ...state, products: [...products] };
    case ActionType.chargeChanges:
      const prevChanges = state.changes ?? [];
      const changes: IChanges = {};
      let leftCash: number = action.payload;
      Config.ChangeTypes.forEach((changeType) => {
        const prevChange = prevChanges[changeType] ?? 0;
        const change = Math.floor(leftCash / +changeType);
        leftCash -= change * +changeType;
        changes[changeType] = prevChange + change;
      });
      return { ...state, changes };
    default:
      return state;
  }
};

const GLOBAL_STATE_KEY = "global_state_key";

function loadGlobalState(): IGlobalState {
  try {
    const state = localStorage.getItem(GLOBAL_STATE_KEY);
    if (state) {
      return JSON.parse(state);
    }
  } catch (exception) {
    console.log(exception);
  }
  return defaultGlobalState;
}

function saveGlobalState(state: IGlobalState) {
  try {
    localStorage.setItem(GLOBAL_STATE_KEY, JSON.stringify(state));
  } catch (exception) {
    console.log(exception);
  }
}

const localStorageMiddleware: IMiddleware<IGlobalState> =
  (store: IStore<IGlobalState>) => (next: Function) => (action: IAction) => {
    next(action);
    saveGlobalState(store.getState());
  };

export const globalStore = createStore(reducer, loadGlobalState(), [
  localStorageMiddleware,
]);
