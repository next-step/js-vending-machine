export const ROUTE_ID = {
  PRODUCT_MANGNE_MENU: 'product-manage-menu',
  VENDING_MACHINE_MANANGE_MENU: 'vending-machine-manage-menu',
  PRODUCT_PURCHASE_MENU: 'product-purchase-menu',
};

export const HASH_NAV_MAP = [
  { id: ROUTE_ID.PRODUCT_MANGNE_MENU, nameKor: '상품 관리', rootElement: '<product-manage></product-manage>' },
  { id: ROUTE_ID.VENDING_MACHINE_MANANGE_MENU, nameKor: '잔돈 충천', rootElement: '<charging-money></charging-money>' },
];
