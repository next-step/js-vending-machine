import store from "./store/index.js";
function App() {
  const MIN_PRODUCT_PRICE = 100;
  const MIN_PRODUCT_COUNT = 1;

  this.currentTap = "product-manage-menu";
  this.state = {
    "product-manage-menu": {},
    "vending-machine-manage-menu": {},
    "product-purchase-menu": {},
  };

  this.init = () => {
    if (store.getCurrentTab()) {
      this.currentTap = store.getCurrentTab();
    }
    if (store.getTabState()) {
      this.state = store.getTabState();
    }
    render();
    initEventListeners();
  };

  const productManagerMenuTemplate = () => {
    return /* html */ `
    <h3>상품 추가하기</h3>
    <form class="product-container" id="product-container-form">
      <input type="text" id="product-name-input" placeholder="상품명" autofocus required/>
      <input type="number" id="product-price-input" placeholder="가격" min=${MIN_PRODUCT_PRICE} required/>
      <input type="number" id="product-quantity-input" placeholder="수량" min=${MIN_PRODUCT_COUNT} required/>
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
  };

  const productInventoryTemplate = (name, value) => {
    return /* html */ `
    <tr>
      <td>${name}</td>
      <td>${value.price}</td>
      <td>${value.count}</td>
    </tr>
    `;
  };

  const productManagerMenuRenderer = () => {
    document.querySelector("#app").innerHTML = productManagerMenuTemplate();
    const template = Object.keys(this.state[this.currentTap])
      .map((key) => {
        return productInventoryTemplate(key, this.state[this.currentTap][key]);
      })
      .join("");
    document
      .querySelector("#product-inventory-container")
      .insertAdjacentHTML("beforeend", template);
  };

  const vendingMachineManageMenu = () => {
    document.querySelector("#app").innerHTML = `vending-machine-manage-menu`;
  };

  const productPurchaseMenu = () => {
    document.querySelector("#app").innerHTML = `product-purchase-menu`;
  };

  const render = () => {
    switch (this.currentTap) {
      case "product-manage-menu":
        return productManagerMenuRenderer();
      case "vending-machine-manage-menu":
        return vendingMachineManageMenu();
      case "product-purchase-menu":
        return productPurchaseMenu();
    }
  };

  const testProductPrice = (price) => {
    return price % 10 == 0;
  };

  const addProduct = (event) => {
    event.preventDefault();
    if (!testProductPrice(event.target.children[1].value)) {
      alert("상품의 가격은 10원으로 나누어 떨어져야합니다.");
      return;
    }
    this.state[this.currentTap][event.target.children[0].value] = {
      price: event.target.children[1].value,
      count: event.target.children[2].value,
    };
    store.setTabState(this.state);
    render();
  };

  const initEventListeners = () => {
    document.querySelector("nav").addEventListener("click", (e) => {
      const isNavButton = e.target.classList.contains(
        "vending-machine-menu-name"
      );
      if (isNavButton) {
        this.currentTap = e.target.id;
        store.setCurrentTab(e.target.id);
        render();
      }
    });
    document
      .querySelector("#product-container-form")
      .addEventListener("submit", addProduct);
  };
}

const app = new App();
app.init();
