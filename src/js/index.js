import { SELECTOR_MAP, querySelector } from './ui/selector.js';
import {
  addProduct,
  clearChargeAmountInput,
  clearProductInputs,
  clearSpendingAmountInput,
  insertCoins,
  renderChargeAmount,
  renderProduct,
  renderPurchasableProduct,
  renderReturnedChanges,
  renderSpendingAmount,
  renderTotalChargeAmount,
  showTab,
} from './ui/function.js';
import {
  setChangeRemovingSpaceListener,
  setClickEventListenerWithVendingMachine,
  setEnterEventListener,
} from './ui/setListener.js';
import { saveItem } from './util/dataSaver.js';
import { DATA_STORAGE } from './ui/constant.js';
import { vendingMachine } from './service/VendingMachine.js';

Object.keys(SELECTOR_MAP.TAB_BUTTON).forEach((key) => {
  const tabButtonSelector = SELECTOR_MAP.TAB_BUTTON[key];
  const tabSelector = SELECTOR_MAP.TABS[key];

  const callbackFunction = {
    [SELECTOR_MAP.TABS.MANAGING_PRODUCT]: () => {
      renderProduct(vendingMachine);
    },
    [SELECTOR_MAP.TABS.MANAGING_CHARGE]: () => {
      renderChargeAmount(vendingMachine);
    },
    [SELECTOR_MAP.TABS.PURCHASING_PRODUCT]: () => {
      renderPurchasableProduct(vendingMachine);
    },
  };
  querySelector(tabButtonSelector).addEventListener('click', () => {
    const callback = callbackFunction[tabSelector];
    typeof callback === 'function' && callback();
    showTab(tabSelector);
  });
});

setClickEventListenerWithVendingMachine(querySelector(SELECTOR_MAP.BUTTON.PRODUCT_ADD), (vendingMachine) => {
  addProduct(vendingMachine);
  clearProductInputs();
  renderProduct(vendingMachine);
  querySelector(SELECTOR_MAP.INPUT.PRODUCT_NAME).focus();

  saveItem(DATA_STORAGE.PRODUCTS, vendingMachine.productManager.products);
});

setClickEventListenerWithVendingMachine(querySelector(SELECTOR_MAP.BUTTON.CHARGE_AMOUNT), (vendingMachine) => {
  insertCoins(vendingMachine);
  clearChargeAmountInput();
  renderChargeAmount(vendingMachine);
  renderTotalChargeAmount(vendingMachine);

  saveItem(DATA_STORAGE.UNIT_COUNTS, vendingMachine.unitCountMachine.unitCountInfo);
});
setChangeRemovingSpaceListener(querySelector(SELECTOR_MAP.INPUT.PRODUCT_NAME));

setClickEventListenerWithVendingMachine(querySelector(SELECTOR_MAP.BUTTON.INSERTION_FOR_MONEY), (vendingMachine) => {
  const amount = querySelector(SELECTOR_MAP.INPUT.SPENDING_MONEY_INPUT).value;
  vendingMachine.insertMoney(Number(amount));
  clearSpendingAmountInput();
  renderSpendingAmount(vendingMachine);
});

[
  ([SELECTOR_MAP.INPUT.PRODUCT_NAME, SELECTOR_MAP.INPUT.PRODUCT_PRICE],
  [SELECTOR_MAP.INPUT.PRODUCT_PRICE, SELECTOR_MAP.INPUT.PRODUCT_AMOUNT],
  [SELECTOR_MAP.INPUT.PRODUCT_AMOUNT, SELECTOR_MAP.BUTTON.PRODUCT_ADD],
  [SELECTOR_MAP.INPUT.CHARGE_AMOUNT, SELECTOR_MAP.BUTTON.CHARGE_AMOUNT],
  [SELECTOR_MAP.INPUT.SPENDING_MONEY_INPUT, SELECTOR_MAP.BUTTON.INSERTION_FOR_MONEY]),
].forEach(([input, nextInputSelector]) => {
  setEnterEventListener(querySelector(input), () => querySelector(nextInputSelector).focus());
});

setClickEventListenerWithVendingMachine(querySelector(SELECTOR_MAP.BUTTON.RETURN_CHANGES_BUTTON), (vendingMachine) => {
  const remainInfo = vendingMachine.returnChanges();
  renderSpendingAmount(vendingMachine);
  renderReturnedChanges(remainInfo);
  saveItem(DATA_STORAGE.UNIT_COUNTS, vendingMachine.unitCountMachine.unitCountInfo);
});
window.addEventListener('load', () => renderProduct(vendingMachine));
