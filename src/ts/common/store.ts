import { createStore, IAction, IReducer } from "../core/tiny-redux";
import { ActionType } from "./constants";

interface IState {
  products: IProduct[];
}

export interface IProduct {
  name: string;
  price: number;
  quantity: number;
}

const reducer: IReducer<IState> = (state: IState, action: IAction) => {
  switch (action.type) {
    case ActionType.addProduct:
      const products = state?.products ?? [];
      return { ...state, products: [...products, action.payload] };
    default:
      return state;
  }
};

export const store = createStore(reducer);
