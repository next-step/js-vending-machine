import store from "../store/index.js";
class ProductManageMenuRenderer {
  static MIN_PRODUCT_PRICE = 100;
  static MIN_PRODUCT_COUNT = 1;
  #app;

  constructor($app) {
    this.#app = $app;
    this.initRenderer();
    this.initEventListener();
  }

  static productInventoryTemplate(name, value) {
    return /* html */ `
    <tr>
      <td>${name}</td>
      <td>${value.price}</td>
      <td>${value.count}</td>
    </tr>
    `;
  }

  static productManagerMenuTemplate = /* html */ `
    <h3>상품 추가하기</h3>
    <form class="product-container" id="product-container-form">
      <input type="text" id="product-name-input" placeholder="상품명" autofocus required/>
      <input type="number" id="product-price-input" placeholder="가격" min=${ProductManageMenuRenderer.MIN_PRODUCT_PRICE} required/>
      <input type="number" id="product-quantity-input" placeholder="수량" min=${ProductManageMenuRenderer.MIN_PRODUCT_COUNT} required/>
      <button type="submit" id="product-add-button" form="product-container-form">추가하기</button>
    </form>
    <table class="product-inventory">
    <h3>상품 현황</h3>
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
    this.#app.innerHTML = ProductManageMenuRenderer.productManagerMenuTemplate;
    if (!store.getTabState()[store.getCurrentTab()]) return;
    const template = Object.keys(store.getTabState()[store.getCurrentTab()])
      .map((key) => {
        return ProductManageMenuRenderer.productInventoryTemplate(
          key,
          store.getTabState()[store.getCurrentTab()][key]
        );
      })
      .join("");
    document
      .querySelector("#product-inventory-container")
      .insertAdjacentHTML("beforeend", template);
  }

  testProductPrice(price) {
    return price % 10 == 0;
  }

  addProduct = (event) => {
    event.preventDefault();
    if (!this.testProductPrice(event.target.children[1].value)) {
      alert("상품의 가격은 10원으로 나누어 떨어져야합니다.");
      return;
    }
    const state = store.getTabState();
    state[store.getCurrentTab()][event.target.children[0].value] = {
      price: event.target.children[1].value,
      count: event.target.children[2].value,
    };
    store.setTabState(state);
    this.initRenderer();
  };

  initEventListener() {
    document
      .querySelector("#product-container-form")
      .addEventListener("submit", this.addProduct);
  }
}
export default ProductManageMenuRenderer;
