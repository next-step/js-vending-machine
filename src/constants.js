export const ACTIONS = Object.freeze({
  ADD_PRODUCT: 'ADD_PRODUCT',
  UPDATE_CHANGE: 'UPDATE_CHANGE',
})

export const VIEWS = Object.freeze({
  PRODUCT_INVENTORY: 'product-manage-menu',
  CHANGE: 'vending-machine-manage-menu',
})

export const ERROR_MESSAGES = Object.freeze({
  INVALID_PRODUCT_PRICE: '상품 가격은 10원으로 나누어 떨어져야 합니다.',
  INVALID_CHANGE: '잔돈은 10원으로 나누어 떨어져야 합니다.',
})
