import { CHARGE, COINS } from '../constants/vendingMachineManageMenu.js';

export const productStorage = {
  get(key) {
    return new Map(JSON.parse(localStorage.getItem(key))) ?? new Map();
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(Array.from(value.entries())));
  },
};

export const chargeStorage = {
  get(key) {
    return Number(localStorage.getItem(key)) ?? CHARGE.INIT;
  },

  set(key, value) {
    localStorage.setItem(key, String(value));
  },
};

export const coinsStorage = {
  get(key) {
    return JSON.parse(localStorage.getItem(key)) ?? COINS.INIT;
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};
