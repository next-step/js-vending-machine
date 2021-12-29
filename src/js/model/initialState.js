import { MACHINE_MODE } from '../constants/index.js';

export const INITIAL_STATE = {
  PRODUCTS: [],
  MACHINE_MODE: MACHINE_MODE.MANAGE_PRODUCT,
  CHARGED_COINS: {
    10: 0,
    50: 0,
    100: 0,
    500: 0,
  },
  RETURN_COINS: {
    10: 0,
    50: 0,
    100: 0,
    500: 0,
  },
  CHARGED_AMOUNT_BY_USER: 0,
};
