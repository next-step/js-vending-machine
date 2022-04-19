import VendingMachineView from './VendingMachineView.js';

import { $ } from './utils/dom.js';
import store from './utils/store.js';
import { ERROR_MESSAGE, SELECTOR, STORE_KEY, TAB } from './constants.js';

class VendingMachine {
  constructor(target) {
    this.vendingMachineView = new VendingMachineView(target);

    this.state = {
      currentTab: store.getValue(STORE_KEY.CURRENT_TAB) || TAB.PRODUCT_MANAGE_TAB,
      products: store.getValue(STORE_KEY.PRODUCTS) || [],
    };

    this.render();
    this.addEvents();
    this.initEvents();
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }

  render() {
    this.vendingMachineView.render(this.state);
  }

  addEvents() {
    $(`#${SELECTOR.PRODUCT_MANAGE_MENU_ID}`).onclick = this.onClickMenu.bind(this);
    $(`#${SELECTOR.PRODUCT_PURCHASE_MENU_ID}`).onclick = this.onClickMenu.bind(this);
    $(`#${SELECTOR.VENDING_MACHINE_MANAGE_MENU_ID}`).onclick = this.onClickMenu.bind(this);
  }

  initEvents() {
    $(`#${SELECTOR.APP_ID}`).addEventListener('click', event => {
      if (event.target.id === SELECTOR.PRODUCT_ADD_BUTTON_ID) {
        this.addProduct();
      }
    });
  }

  addProduct() {
    const inputProductName = $(`#${SELECTOR.PRODUCT_NAME_INPUT_ID}`).value;
    const inputProductPrice = $(`#${SELECTOR.PRODUCT_PRICE_INPUT_ID}`).value;
    const inputProductQuantity = $(`#${SELECTOR.PRODUCT_QUANTITY_INPUT_ID}`).value;

    try {
      this.validateProductDatas(inputProductName, inputProductPrice, inputProductQuantity);
    } catch (error) {
      alert(error.message);
      return;
    }

    const newProduct = {
      name: inputProductName,
      price: inputProductPrice,
      quantity: inputProductQuantity,
    };

    this.filterDuplicateProduct(newProduct.name);

    this.setState({
      ...this.state,
      products: [...this.state.products, newProduct],
    });
    store.setValue(STORE_KEY.PRODUCTS, this.state.products);
  }

  filterDuplicateProduct(productName) {
    this.state.products = this.state.products.filter(product => product.name !== productName);
  }

  validateProductDatas(name, price, quantity) {
    this.validateProductName(name);
    this.validateProductPrice(price);
    this.validateProductQuantity(quantity);
  }

  validateProductName(productName) {
    if (!productName) throw new Error(ERROR_MESSAGE.REQUIRED_PRODUCT_NAME);
  }

  validateProductPrice(productPrice) {
    if (!productPrice) throw new Error(ERROR_MESSAGE.REQUIRED_PRODUCT_PRICE);
    else if (productPrice < 100) throw new Error(ERROR_MESSAGE.PRODUCT_PRICE_HAVE_TO_OVER_100);
    else if (productPrice % 10 !== 0)
      throw new Error(ERROR_MESSAGE.PRODUCT_PRICE_HAVE_TO_DIVIDED_BY_10);
  }

  validateProductQuantity(productQuantity) {
    if (!productQuantity) throw new Error(ERROR_MESSAGE.REQUIRED_PRODUCT_QUANTITY);
    else if (productQuantity < 1) throw new Error(ERROR_MESSAGE.PRODUCT_QUANTITY_HAVE_TO_OVER_1);
  }

  onClickMenu(event) {
    const clickedTab = event.target.textContent;
    store.setValue(STORE_KEY.CURRENT_TAB, clickedTab);
    this.setState({
      ...this.state,
      currentTab: clickedTab,
    });
  }
}

export default VendingMachine;
