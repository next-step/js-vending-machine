import { getLocalStorageValueByKey, setLocalStorageValue } from '../service/localStorageService.js';
import { LOCAL_STORAGE_KEY } from '../constants/index.js';
import { pureSplice } from '../utils/utils.js';
import { INITIAL_STATE } from './initialState.js';

export default class Model {
  constructor() {
    this.products = getLocalStorageValueByKey(LOCAL_STORAGE_KEY.PRODUCTS) || INITIAL_STATE.PRODUCTS;

    this.machineMode =
      getLocalStorageValueByKey(LOCAL_STORAGE_KEY.MACHINE_MODE) || INITIAL_STATE.MACHINE_MODE;

    this.chargedCoins =
      getLocalStorageValueByKey(LOCAL_STORAGE_KEY.CHARGED_COINS) || INITIAL_STATE.CHARGED_COINS;

    this.chargedAmountByUser =
      getLocalStorageValueByKey(LOCAL_STORAGE_KEY.CHARGED_AMOUNT_BY_USER) ||
      INITIAL_STATE.CHARGED_AMOUNT_BY_USER;

    this.returnCoins =
      getLocalStorageValueByKey(LOCAL_STORAGE_KEY.RETURNED_COINS) || INITIAL_STATE.RETURN_COINS;
  }

  setProducts(newProduct) {
    const targetIndex = this.products.findIndex((product) => product.name === newProduct.name);
    const existsSameProduct = targetIndex >= 0;

    this.products = existsSameProduct
      ? pureSplice(this.products, targetIndex, { ...newProduct, id: this.products[targetIndex].id })
      : [...this.products, newProduct];

    setLocalStorageValue(LOCAL_STORAGE_KEY.PRODUCTS, this.products);
  }

  setCurrentTab(clickedMachineMode) {
    this.machineMode = clickedMachineMode;
    setLocalStorageValue(LOCAL_STORAGE_KEY.MACHINE_MODE, clickedMachineMode);
  }

  setChargedCoins(newCoinsObject) {
    [...Object.entries(newCoinsObject)].forEach(([key, value]) => {
      this.chargedCoins[key] += value;
    });
    setLocalStorageValue(LOCAL_STORAGE_KEY.CHARGED_COINS, this.chargedCoins);
  }

  setChargedAmountByUser(newChargedAmountByUser) {
    this.chargedAmountByUser = newChargedAmountByUser;
    setLocalStorageValue(LOCAL_STORAGE_KEY.CHARGED_AMOUNT_BY_USER, this.chargedAmountByUser);
  }

  setReturnCoins(newReturnCoins) {
    this.returnCoins = newReturnCoins;
    setLocalStorageValue(LOCAL_STORAGE_KEY.RETURNED_COINS, this.returnCoins);
  }
}
