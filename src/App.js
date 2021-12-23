import Component from "./core/Component.js";
import ProductManager from "./components/ProductManager.js";
import MachineCharger from "./components/MachineCharger.js";
import ProductPurchaser from "./components/ProductPurchaser.js";

export default class App extends Component {
  setup() {
    this.$state = {
      currentTap: "product-manage-menu",
    };
  }

  template() {
    return /*html*/ `
    <nav id="tab-list">
      <button id="product-manage-menu">상품 관리</button>
      <button id="vending-machine-manage-menu">잔돈충전</button>
      <button id="product-purchase-menu">상품 구매</button>
    </nav>
    <section id="vending-machine-container"></section>
    `;
  }

  mounted() {
    const $container = this.$target.querySelector("#vending-machine-container");

    if (this.$state.currentTap === "product-manage-menu") {
      new ProductManager($container);
    }
    if (this.$state.currentTap === "vending-machine-manage-menu") {
      new MachineCharger($container);
    }
    if (this.$state.currentTap === "product-purchase-menu") {
      new ProductPurchaser($container);
    }
  }

  setEvent() {
    this.addEvent("click", "#tab-list", (e) => {
      if (e.target.id === "tab-list") return;
      this.setState({
        currentTap: e.target.id,
      });
    });
  }
}
