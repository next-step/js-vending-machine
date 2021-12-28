import { getLocalStorageValueByKey, setLocalStorageValue } from '../service/localStorageService.js';
import { MACHINE_MODE, LOCAL_STORAGE_KEY } from '../constants/index.js';

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
  }

  addNewProduct(newProduct) {
    this.products = [...this.products, newProduct];
    setLocalStorageValue(LOCAL_STORAGE_KEY.PRODUCTS, this.products);
  }

  updateSameProduct(newProduct) {
    this.products = [...this.products].map((product) => {
      if (product.name === newProduct.name) return newProduct;
      return product;
    });
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
}
