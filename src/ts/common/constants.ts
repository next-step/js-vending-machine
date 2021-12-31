export const Id = Object.freeze({
  app: "app",
  productManageMenuBtn: "product-add-menu",
  vendingMachineManageMenuBtn: "vending-machine-manage-menu",
  purchaseMenuBtn: "product-purchase-menu",
  charge_amount: "charge-amount",
  current_tab: "current_tab",
  tapComp: "tap-component",
  productManageComp: "product-manage-component",
  changesChargeComp: "changes-charge-component",
  productPurchaseComp: "product-purchase-component",
  productNameInput: "product-name-input",
  productPriceInput: "product-price-input",
  productQuantityInput: "product-quantity-input",
  productAddBtn: "product-add-button",
  vendingMachineChargeInput: "vending-machine-charge-input",
  vendingMachineChargeButton: "vending-machine-charge-button",
  vendingMachineChargeAmount: "vending-machine-charge-amount",
  vendingMachineCoinQuantity: (change: number) =>
    `vending-machine-coin-${change}-quantity`,
  chargeInput: "charge-input",
  chargeAmount: "charge-amount",
  chargeBtn: "charge-button",
  coinChanger: "coin-changer",
  coinReturnBtn: "coin-return-button",
});

export const ClassName = Object.freeze({
  displayNone: "d-none",
  table: "table",
  tableCell: "table-cell",
  productManageForm: "product-manage-form",
  productManageItem: "product-manage-item",
  productManageName: "product-manage-name",
  productManagePrice: "product-manage-price",
  productManageQuantity: "product-manage-quantity",
  purchaseBtn: "purchase-button",
  vendingMachineWrapper: "vending-machine-wrapper",
  cashboxRemaining: "cashbox-remaining",
  purchaseContainer: "purchase-container",
});

export const Config = Object.freeze({
  MinPrice: 100,
  PriceStep: 10,
  ChangeTypes: [500, 100, 50, 10],
});

export const ActionType = Object.freeze({
  addOrUpdateProduct: "ADD_OR_UPDATE_PRODUCT",
  chargeChanges: "CHARGE_CHANGES",
  chargeAmount: "CHARGE_AMOUNT",
  purchaseProduct: "PURCHASE_PRODUCT",
  returnChanges: "RETURN_CHANGES",
});

export const AlertMsg = Object.freeze({
  productSoldOut: "Sold out Product.",
  notEnoughAmount: "Not enough amount.",
  notFoundProduct: "Not found product.",
});
