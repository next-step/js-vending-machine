import {
  createStore,
  IAction,
  IMiddleware,
  IReducer,
  IStore,
} from "../core/tiny-redux";
import { ActionType } from "./constants";

interface IGlobalState {
  products: IProduct[];
}

const defaultGlobalState: IGlobalState = {
  products: [],
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
