import Product from '../Product.js';
import ProductManage from '../ProductManage.js';
import { PRODUCT } from '../constants/product-constant.js';

const productManageTemplate = () => {
  const $template = new DocumentFragment();
  const $tempElement = document.createElement('div');
  $template.append($tempElement);
  $tempElement.insertAdjacentHTML(
    'afterend',
    `
    <h3>상품 추가하기</h3>
    <div class="product-container">
      <form id="product-form">
        <input required type="text" name="name" id="product-name-input" placeholder="상품명" />
        <input required type="number" name="price" min="${PRODUCT.MIN_PRICE}" step="${PRODUCT.STEP_PRICE}" id="product-price-input" placeholder="가격" />
        <input required type="number" name="quantity" min="${PRODUCT.MIN_QUANTITY}" id="product-quantity-input" placeholder="수량" />
        <button type="submit" id="product-add-button">추가하기</button>
      </form>
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
  `
  );
  $tempElement.remove();
  return $template;
};

const productTemplate = ({ name, price, quantity }) => {
  const $template = new DocumentFragment();
  const $tr = document.createElement('tr');
  $tr.dataset.name = name;
  $tr.dataset.price = price;
  $tr.dataset.quantity = quantity;
  $tr.insertAdjacentHTML(
    'afterbegin',
    `
    <td>${name}</td>
    <td>${price}</td>
    <td>${quantity}</td>
  `
  );
  $template.append($tr);
  return $template;
};

const $productForm = () => document.querySelector('#product-form');

const $productNameInput = () =>
  $productForm().querySelector('#product-name-input');

const $productPriceInput = () =>
  $productForm().querySelector('#product-price-input');

const $productQuantityInput = () =>
  $productForm().querySelector('#product-quantity-input');

const $productInventory = () =>
  document.querySelector('#product-inventory-container');

const convertFormDataToObject = (formData) => Object.fromEntries(formData);

const ProductManageView = (() => {
  const updateProductList = () => {
    $productInventory().replaceChildren(
      ...ProductManage.list().map((product) => productTemplate(product))
    );
  };

  const initializeProductFields = () => {
    $productNameInput().value = null;
    $productPriceInput().value = null;
    $productQuantityInput().value = null;
  };

  const handleProductAdd = (event) => {
    event.preventDefault();
    try {
      ProductManage.addProduct(
        new Product(convertFormDataToObject(new FormData(event.target)))
      );
      updateProductList();
      initializeProductFields();
    } catch (e) {
      alert(e.message);
    }
  };

  const contents = () => productManageTemplate();

  const initialize = () => {
    updateProductList();
  };

  return { contents, initialize, handleProductAdd };
})();
export default ProductManageView;
