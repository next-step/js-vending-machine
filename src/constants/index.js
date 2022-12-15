export const STORAGE = {
  KEY: 'vending-machine-state',
};

export const DEFAULT_TYPED_PRODUCT = {
  name: '',
  price: null,
  quantity: null,
};

export const VENDING_MACHINE_INITIAL_STATE = {
  typedProduct: DEFAULT_TYPED_PRODUCT,
  products: [],
  charginValue: 0,
};

export const ELEMENT = {
  INPUT: {
    PRODUCT_NAME: 'product-name-input',
    PRODUCT_PRICE: 'product-price-input',
    PRODUCT_QUANTITY: 'product-quantity-input',
  },
};
