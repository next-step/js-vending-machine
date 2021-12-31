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
  amount: number;
  returnedChanges: IChanges;
}

const defaultGlobalState: IGlobalState = {
  products: [],
  changes: {
    10: 0,
    50: 0,
    100: 0,
    500: 0,
  },
  amount: 0,
  returnedChanges: {
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
    case ActionType.addOrUpdateProduct: {
      const products = state.products ?? [];
      const product = action.payload as IProduct;
      const idx = products.findIndex((p) => p.name === product.name);
      if (idx === -1) products.push(product);
      else products[idx] = product;

      return { ...state, products: [...products] };
    }

    case ActionType.chargeChanges: {
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
    }

    case ActionType.chargeAmount: {
      const prevAmount = state.amount ?? 0;
      const amount = prevAmount + action.payload;
      return { ...state, amount };
    }

    case ActionType.purchaseProduct: {
      const { products, amount: prevAmount } = state;
      const productName = action.payload as string;
      const product = products.find((p) => p.name === productName);
      product!.quantity--;
      const amount = prevAmount - product!.price;
      return { ...state, amount, products: [...products] };
    }

    case ActionType.returnChanges: {
      const { remainChanges, returnedChanges, amount } = changeCoin(
        state.changes,
        state.amount,
        Config.ChangeTypes
      );
      return { ...state, changes: remainChanges, returnedChanges, amount };
    }

    default:
      return state;
  }
};

function changeCoin(changes: IChanges, amount: number, changeTypes: number[]) {
  const remainChanges: IChanges = {};
  const returnedChanges: IChanges = {};
  changeTypes
    .sort((t1, t2) => t2 - t1)
    .forEach((changeType) => {
      const neededCount = Math.floor(amount / changeType);
      const remainCount = changes[changeType];
      const returnCount = Math.min(neededCount, remainCount);
      amount -= returnCount * changeType;
      returnedChanges[changeType] = returnCount;
      remainChanges[changeType] = remainCount - returnCount;
    });
  return {
    remainChanges,
    returnedChanges,
    amount,
  };
}

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
