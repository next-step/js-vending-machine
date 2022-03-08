import Component from "../lib/Component.js";
import ProductManagement from "./ProductManagement.js";
import ProductPurchase from "./ProductPurchase.js";
import VendingMachineManagement from "./VendingMachineManagement.js";
import {$} from "../components/utils.js";

export default class App extends Component {
  setup() {
    this.state = {
      menu: ''
    }
  }

  template() {
    return `
      <article class="menu-buttons">
        <button id="product-manage-menu">상품 관리</button>
        <button id="vending-machine-manage-menu">잔돈충전</button>
        <button id="product-purchase-menu">상품 구매</button>
      </article>
      <article id="ProductManagement" class="menu d-flex justify-center mt-5"></article>
      <article id="VendingMachineManagement" class="menu d-flex justify-center mt-5"></article>
      <article id="ProductPurchase" class="menu d-flex justify-center mt-5"></article>
    `;
  }

  mounted() {
    const {menu, productList} = this.state;
    new ProductManagement('#ProductManagement', {menu});
    new VendingMachineManagement('#VendingMachineManagement', {menu});
    new ProductPurchase('#ProductPurchase', {menu});
    $('#product-manage-menu').addEventListener('click', () => this.setState({menu: 'ProductManagement'}));
    $('#vending-machine-manage-menu').addEventListener('click', () => this.setState({menu: 'VendingMachineManagement'}));
    $('#product-purchase-menu').addEventListener('click', () => this.setState({menu: 'ProductPurchase'}));
  }

}