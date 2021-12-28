import { getLocalStorageValueByKey, setLocalStorageValue } from '../service/localStorageService.js';
import { MACHINE_MODE, LOCAL_STORAGE_KEY } from '../constants/index.js';
import { pureSplice } from '../utils/utils.js';

export default class Model {
  constructor() {
    this.products = getLocalStorageValueByKey(LOCAL_STORAGE_KEY.PRODUCTS) || [];
    this.machineMode = getLocalStorageValueByKey(LOCAL_STORAGE_KEY.MACHINE_MODE) || MACHINE_MODE.MANAGE_PRODUCT;
    this.chargedCoins = getLocalStorageValueByKey(LOCAL_STORAGE_KEY.CHARGED_COINS) || {
      10: 0,
      50: 0,
      100: 0,
      500: 0,
    };
    this.chargedAmountByUser = getLocalStorageValueByKey(LOCAL_STORAGE_KEY.CHARGED_AMOUNT_BY_USER) || 0;
  }

  setProducts(newProduct) {
    const targetIndex = this.products.findIndex((product) => product.name === newProduct.name);
    const isSameProduct = targetIndex >= 0;

    this.products = isSameProduct
      ? pureSplice(this.products, targetIndex, newProduct)
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
    this.chargedAmountByUser += newChargedAmountByUser;
    setLocalStorageValue(LOCAL_STORAGE_KEY.CHARGED_AMOUNT_BY_USER, this.chargedAmountByUser);
  }
}
