/**
 * 요구사항
 * - 새로고침시에도 가장 최근에 작업한 정보를 불러와야함
 *  - 최근 탭, 최그 탭에 해당하는 최신 정보 관리 필요
 *
 *
 *
 */

import store from "./store/index.js";
function App() {
  const MIN_PRODUCT_PRICE = 100;
  const MIN_PRODUCT_COUNT = 1;

  this.currentTap = "product-manage-menu";
  this.init = () => {
    if (store.getCurrentTab()) {
      this.currentTap = store.getCurrentTab();
    }
    render();
    initEventListeners();
  };

  const mapView = () => {
    switch (this.currentTap) {
      case "product-manage-menu":
        return `
        <h3>상품 추가하기</h3>
        <form class="product-container">
          <input type="text" id="product-name-input" placeholder="상품명" autofocus required/>
          <input type="number" id="product-price-input" placeholder="가격" min=${MIN_PRODUCT_PRICE} required/>
          <input type="number" id="product-quantity-input" placeholder="수량" min=${MIN_PRODUCT_COUNT} required/>
          <button id="product-add-button">추가하기</button>
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
      case "vending-machine-manage-menu":
        return `vending-machine-manage-menu`;
      case "product-purchase-menu":
        return `product-purchase-menu`;
    }
  };
  const render = () => {
    document.querySelector("#app").innerHTML = mapView();
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
  };
}

const app = new App();
app.init();
