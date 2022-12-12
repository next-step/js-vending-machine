import store from "../util/store/store.js";
import ProductManageMenuService from "../Controller/ProductManageMenuService.js";
import { MENU_TAB, PRODUCT_MANAGE_MENU } from "../util/constants.js";
import { removeAllChild } from "../util/utils.js";

export class ProductManageMenuRenderer {
  constructor(app) {
    this.app = app;
    this.productManageMenuService = new ProductManageMenuService();
    this.initRenderer();
    this.initAddEventListener();
  }

  static produceInventoryTemplate(name, value) {
    return `
  <tr>
      <td>${name}</td>
      <td>${value.price}</td>
      <td>${value.quantity}</td>
  </tr>
`;
  }

  static productManageMenuTemplate = `<h3>상품 추가하기</h3>
    <div class="product-container">
      <form id="product-container-form">
        <input type="text" id="product-name-input" placeholder="상품명" />
        <input type="number" id="product-price-input" placeholder="가격" />
        <input type="number" id="product-quantity-input" placeholder="수량" />
        <button id="product-add-button">추가하기</button>
      </form>
    </div>
    <h3>상품 현황</h3>
    <table class="product-inventory">
        <colgroup>
            <col style="width: 140px" />
            <col style="width: 100px" />
            <col style="width: 100px" />
        </colgroup>
        <thead>
            <tr>
                <th>상품명</th>
                <th>가격</th>
                <th>수량</th>
            </tr>
        </thead>
        <tbody id="product-inventory-container"></tbody>
    </table>
    `;

  initRenderer() {
    removeAllChild(this.app);
    this.app.insertAdjacentHTML(
      "afterbegin",
      ProductManageMenuRenderer.productManageMenuTemplate
    );

    const template = Object.keys(this.productManageMenuService.getProduct())
      .map((name) => {
        return ProductManageMenuRenderer.produceInventoryTemplate(
          name,
          this.productManageMenuService.getProduct()[name]
        );
      })
      .join("");

    document
      .getElementById("product-inventory-container")
      .insertAdjacentHTML("afterbegin", template);
  }

  addProduct = (e) => {
    e.preventDefault();

    const name = e.target.children[0].value;
    const price = e.target.children[1].value;
    const quantity = e.target.children[2].value;

    this.productManageMenuService.addProduct(name, price, quantity);
    this.initRenderer();
  };

  initAddEventListener() {
    document
      .getElementById(PRODUCT_MANAGE_MENU.PRODUCT_FORM)
      .addEventListener("submit", this.addProduct); //TODO
  }
}
