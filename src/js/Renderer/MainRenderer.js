import store from "../store/index.js";
import VendingMachineManageMenuRenderer from "./VendingMachineManageMenuRenderer.js";
import ProductPurchaseMenuRenderer from "./ProductPurchaseMenuRenderer.js";
import ProductManageMenuRenderer from "./ProductManageMenuRenderer.js";

class MainRenderer {
  #app;

  constructor($app) {
    this.#app = $app;
    this.initRenderer();
    this.initEventListener();
  }

  initRenderer() {
    switch (store.getCurrentTab()) {
      case "product-manage-menu":
        return new ProductManageMenuRenderer(this.#app);
      case "vending-machine-manage-menu":
        return new VendingMachineManageMenuRenderer(this.#app);
      case "product-purchase-menu":
        return new ProductPurchaseMenuRenderer(this.#app);
    }
  }
  initEventListener() {
    document.querySelector("nav").addEventListener("click", (e) => {
      const isNavButton = e.target.classList.contains(
        "vending-machine-menu-name"
      );
      if (isNavButton) {
        store.setCurrentTab(e.target.id);
        this.initRenderer();
      }
    });
  }
}

export default MainRenderer;
