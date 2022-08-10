function App() {
  this.currentTap = "product-manage-menu";
  this.init = () => {
    render();
    initEventListeners();
  };

  const mapView = () => {
    switch (this.currentTap) {
      case "product-manage-menu":
        return `
        <h3>상품 추가하기</h3>
        <div class="product-container">
          <input type="text" id="product-name-input" placeholder="상품명" />
          <input type="number" id="product-price-input" placeholder="가격" />
          <input type="number" id="product-quantity-input" placeholder="수량" />
          <button id="product-add-button">추가하기</button>
        </div>
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
        render();
      }
    });
  };
}

const app = new App();
app.init();
