class ProductManageMenu {
  constructor($app) {
    this.app = $app;
    this.initRenderer();
  }

  productManagerMenuTemplate = `
    <h3>상품 추가하기</h3>
    <form class="product-container" id="product-container-form">
      <input type="text" id="product-name-input" placeholder="상품명" autofocus required/>
      <input type="number" id="product-price-input" placeholder="가격" min=${MIN_PRODUCT.PRICE} required/>
      <input type="number" id="product-quantity-input" placeholder="수량" min=${MIN_PRODUCT.COUNT} required/>
      <button type="submit" id="product-add-button">추가하기</button>
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
    this.app.innerHTML = this.productManagerMenuTemplate;
  }
}
export default ProductManageMenu;
