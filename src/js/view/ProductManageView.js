import Product from '../Product.js';
import ProductManage from '../ProductManage.js';
import { PRODUCT } from '../constants/product-constant.js';

function productManageTemplate() {
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
}

function productTemplate({ name, price, quantity }) {
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
}

function $productForm() {
  return document.querySelector('#product-form');
}

function $productNameInput() {
  return $productForm().querySelector('#product-name-input');
}
function $productPriceInput() {
  return $productForm().querySelector('#product-price-input');
}
function $productQuantityInput() {
  return $productForm().querySelector('#product-quantity-input');
}

function $productInventory() {
  return document.querySelector('#product-inventory-container');
}

function convertFormDataToObject(formData) {
  return Object.fromEntries(formData);
}

const ProductManageView = (function () {
  function updateProductList() {
    $productInventory().replaceChildren(
      ...ProductManage.list().map((product) => productTemplate(product))
    );
  }

  function initializeProductFields() {
    $productNameInput().value = null;
    $productPriceInput().value = null;
    $productQuantityInput().value = null;
  }

  function handleProductAdd(event) {
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
  }

  function contents() {
    return productManageTemplate();
  }

  function initialize() {
    updateProductList();
  }

  return { contents, initialize, handleProductAdd };
})();
export default ProductManageView;
