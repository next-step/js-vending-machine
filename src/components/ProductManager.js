import Component from "../core/Component.js";
import ProductAppender from "./ProductAppender.js";
import ProductList from "./ProductList.js";
import { $ } from "../utils/dom.js";
import { setLocalStorage, getLocalStorage } from "../utils/localStorage.js";

export default class ProductManager extends Component {
  setup() {
    const products = getLocalStorage("products");
    if (products.length <= 0) products = [];

    this.$state = {
      products,
    };
  }

  template() {
    return /*html*/ `
    <h3>상품 추가하기</h3>
    <div class="product-container"></div>
    <table class="product-inventory"></table>
    `;
  }

  mounted() {
    const { addNewProduct } = this;
    const $productContainer = $(".product-container", this.$target);
    const $productInventory = $(".product-inventory", this.$target);
    new ProductAppender($productContainer, {
      addNewProduct: addNewProduct.bind(this),
    });
    new ProductList($productInventory, {
      products: this.$state.products,
    });
  }

  addNewProduct({ name, price, quantity }) {
    this.setState({
      products: [...this.$state.products, { name, price, quantity }],
    });
    setLocalStorage("products", this.$state.products);
  }
}
