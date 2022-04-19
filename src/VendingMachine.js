import VendingMachineView from './VendingMachineView.js';
import Validator from './Validator.js';

import { $ } from './utils/dom.js';
import store from './utils/store.js';
import { SELECTOR, STORE_KEY, TAB } from './constants.js';

class VendingMachine {
  constructor(target) {
    this.vendingMachineView = new VendingMachineView(target);
    this.validator = new Validator();

    this.state = {
      currentTab: store.getValue(STORE_KEY.CURRENT_TAB) || TAB.PRODUCT_MANAGE_TAB,
      products: store.getValue(STORE_KEY.PRODUCTS) || [],
    };

    this.render();
    this.initEvents();
  }

  render() {
    this.vendingMachineView.render(this.state);
  }

  initEvents() {
    $(`#${SELECTOR.PRODUCT_MANAGE_MENU_ID}`).onclick = this.changeTab.bind(this);
    $(`#${SELECTOR.PRODUCT_PURCHASE_MENU_ID}`).onclick = this.changeTab.bind(this);
    $(`#${SELECTOR.VENDING_MACHINE_MANAGE_MENU_ID}`).onclick = this.changeTab.bind(this);
    $(`#${SELECTOR.APP_ID}`).addEventListener('click', event => {
      if (event.target.id === SELECTOR.PRODUCT_ADD_BUTTON_ID) {
        this.addProduct();
      }
    });
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }

  changeTab(event) {
    const clickedTab = event.target.textContent;

    this.setState({
      ...this.state,
      currentTab: clickedTab,
    });
    store.setValue(STORE_KEY.CURRENT_TAB, clickedTab);
  }

  addProduct() {
    const inputProductName = $(`#${SELECTOR.PRODUCT_NAME_INPUT_ID}`).value;
    const inputProductPrice = $(`#${SELECTOR.PRODUCT_PRICE_INPUT_ID}`).value;
    const inputProductQuantity = $(`#${SELECTOR.PRODUCT_QUANTITY_INPUT_ID}`).value;

    try {
      this.validator.validateProductDatas(
        inputProductName,
        inputProductPrice,
        inputProductQuantity,
      );
    } catch (error) {
      alert(error.message);
      return;
    }

    this.setState({
      ...this.state,
      products: [
        ...this.state.products.filter(product => product.name !== inputProductName),
        {
          name: inputProductName,
          price: inputProductPrice,
          quantity: inputProductQuantity,
        },
      ],
    });
    store.setValue(STORE_KEY.PRODUCTS, this.state.products);
  }
}

export default VendingMachine;
