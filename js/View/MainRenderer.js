import store from "../util/store/store.js";
import { ProductManageMenuRenderer } from "./ProductManageMenuRenderer.js";
import { VendingMachineMenuRenderer } from "./VendingMachineMenuRenderer.js";

import { MENU_TAB } from "../util/constants.js";

export class MainRenderer {
  constructor($app) {
    this.app = $app;
    this.ProductManageMenuRenderer = new ProductManageMenuRenderer($app);
    this.VendingMachineMenuRenderer = new VendingMachineMenuRenderer($app);

    this.initStorage();
    this.initRenderer();
    this.initEventListener();
  }

  initStorage() {
    if (!store.getCurrentTab()) store.setCurrentTab(MENU_TAB.PRODUCT_MANAGE);
    if (!store.getTabState())
      store.setTabState({
        "product-manage-menu": {},
        "vending-machine-manage-menu": {},
        "product-purchase-menu": {},
      });
  }

  initRenderer() {
    switch (store.getCurrentTab()) {
      case MENU_TAB.PRODUCT_MANAGE:
        return ProductManageMenuRenderer;
      case MENU_TAB.VM_MANAGE:
        return VendingMachineMenuRenderer;
      case MENU_TAB.PRODUCT_PURCHASE:
        return;
    }
  }

  initEventListener() {
    document.querySelector("nav").addEventListener("click", (e) => {
      const isNavBtn = e.target.classList.contains("vending-machine-menu");
      if (isNavBtn) {
        store.setCurrentTab(e.target.id);
        console.log(e.target.id);
        this.initRenderer();
      }
    });
  }
}
