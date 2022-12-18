import { CHARGE_KEY, COINS_KEY, PRODUCT_KEY } from '../constants/storage.js';
import { CHARGE, COINS } from '../constants/vendingMachineManageMenu.js';

export const productStorage = {
  get() {
    return new Map(JSON.parse(localStorage.getItem(PRODUCT_KEY))) ?? new Map();
  },
  set(value) {
    localStorage.setItem(PRODUCT_KEY, JSON.stringify(Array.from(value.entries())));
  },
};

export const chargeStorage = {
  get() {
    return Number(localStorage.getItem(CHARGE_KEY)) ?? CHARGE.INIT;
  },

  set(value) {
    localStorage.setItem(CHARGE_KEY, String(value));
  },
};

export const coinsStorage = {
  get() {
    return JSON.parse(localStorage.getItem(COINS_KEY)) ?? COINS.INIT;
  },
  set(value) {
    localStorage.setItem(COINS_KEY, JSON.stringify(value));
  },
};
