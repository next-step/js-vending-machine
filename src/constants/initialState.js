export const DEFAULT_TYPED_PRODUCT = {
  name: '',
  price: null,
  quantity: null,
};

export const DEFAULT_CHARGE_COINS = {
  500: 0,
  100: 0,
  50: 0,
  10: 0,
};

export const VENDING_MACHINE_INITIAL_STATE = {
  products: [],
  chargedTotal: 0,
  coinMap: DEFAULT_CHARGE_COINS,
};

export const WEB_COMP_MACHINE_INITIAL_STATE = {};
