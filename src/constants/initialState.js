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
  //*TODO: remove useless state
  hashId: 'product-manage-menu',
  typedProduct: DEFAULT_TYPED_PRODUCT,
  typedCoin: 0,

  //
  products: [],
  chargedTotal: 0,
  coinMap: DEFAULT_CHARGE_COINS,
};

export const WEB_COMP_MACHINE_INITIAL_STATE = {};
