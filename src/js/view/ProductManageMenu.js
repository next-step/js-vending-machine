import { checkPriceUnit, checkValidation } from '../validate/index.js';
import ProductManageMenuService from '../service/ProductManageMenuService.js';
import { ERROR_MESSAGE, MIN_PRODUCT, NAME } from '../constants/index.js';
import { removeSpaces } from '../utils/index.js';

class ProductManageMenu {
  constructor($app) {
    this.app = $app;
    this.initRenderer();
    this.initEventListener();
  }

  productManagerMenuTemplate = `
    <h3>상품 추가하기</h3>
    <form class="product-container" id="product-container-form">
      <input name="product-input" type="text" id="product-name-input" placeholder="상품명" autofocus required/>
      <input name="product-input" type="number" id="product-price-input" placeholder="가격" min=${MIN_PRODUCT.PRICE} required/>
      <input name="product-input" type="number" id="product-quantity-input" placeholder="수량" min=${MIN_PRODUCT.COUNT} required/>
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

  static addProductInventoryTemplate(name, value) {
    return `
    <tr>
      <td>${name}</td>
      <td>${value.price}</td>
      <td>${value.count}</td>
    </tr>
    `;
  }

  initRenderer() {
    this.app.innerHTML = this.productManagerMenuTemplate;
    const $productInventoryContainer = document.querySelector('#product-inventory-container');

    const getState = ProductManageMenuService.getCurrentTabState();
    if (!getState) return;

    const productMenuTemplate = Object.keys(getState)
      .map(tabId =>
        ProductManageMenu.addProductInventoryTemplate(tabId, ProductManageMenuService.getCurrentTabState()[tabId])
      )
      .join('');

    $productInventoryContainer.insertAdjacentHTML('beforeend', productMenuTemplate);
  }

  addProductList(e) {
    e.preventDefault();

    const [name, price, count] = new FormData(e.target).getAll(NAME.PRODUCT_INPUT);

    try {
      const inputCondition = checkPriceUnit(parseInt(price, 10));
      checkValidation(inputCondition, ERROR_MESSAGE.INVALID_PRODUCT_UNIT);

      ProductManageMenuService.setProductListState(removeSpaces(name), price, count);
      window.location.reload(); // TODO
      this.initRenderer();
    } catch (error) {
      alert(error.message);
    }
  }

  initEventListener() {
    const $productForm = document.querySelector('#product-container-form');
    $productForm.addEventListener('submit', this.addProductList.bind(this));
  }
}
export default ProductManageMenu;
