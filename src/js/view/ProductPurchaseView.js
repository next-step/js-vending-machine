import { FORM } from '../constants/content-constant.js';
import {
  PRODUCT_PURCHASE_BUTTON,
  PURCHASE,
} from '../constants/purchase-constant.js';
import ProductPurchase from '../ProductPurchase.js';
import ProductManage from '../ProductManage.js';

const chargeAmountTemplate = () => {
  const $template = new DocumentFragment();
  const $div = document.createElement('div');
  $div.classList.add('purchase-container');
  $div.insertAdjacentHTML(
    'afterbegin',
    `
    <h3>충전하기</h3>
    <div className="vending-machine-wrapper">
     <form id="${FORM.PRODUCT_PURCHASE}">
      <input required 
             step="${PURCHASE.STEP_CHARGING_COIN}" 
             min="${PURCHASE.MIN_CHARGING_COIN}" 
             type="number" name="charge-amount" id="charge-input"/>
      <button id="charge-button">충전하기</button>
     </form>
    </div>
    <p>충전 금액: <span id="charge-amount">0</span>원</p>
  `
  );
  $template.append($div);
  return $template;
};

const productListTemplate = () => {
  const $template = new DocumentFragment();
  const $table = document.createElement('table');
  $table.classList.add('product-inventory');
  $table.insertAdjacentHTML(
    'afterbegin',
    `
     <colgroup>
        <col style="width: 140px" />
        <col style="width: 100px" />
        <col style="width: 100px" />
        <col style="width: 100px" />
      </colgroup>
      <thead>
      <tr>
        <th>상품명</th>
        <th>가격</th>
        <th>수량</th>
        <th>구매</th>
      </tr>
      </thead>
      <tbody id="product-inventory-container"></tbody>
  `
  );
  $template.append($table);
  return $template;
};

const contentTemplate = () => {
  const $template = new DocumentFragment();
  $template.append(chargeAmountTemplate(), productListTemplate());
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
    <td class="product-purchase-name">${name}</td>
    <td class="product-purchase-price">${price}</td>
    <td class="product-purchase-quantity">${quantity}</td>
    <td><button class="${PRODUCT_PURCHASE_BUTTON}">구매하기</button></td>
  `
  );
  $template.append($tr);
  return $template;
};

const $chargeAmountInput = () => document.querySelector('#charge-input');
const $chargeAmount = () => document.querySelector('#charge-amount');
const $productInventory = () =>
  document.querySelector('#product-inventory-container');

const ProductPurchaseView = (() => {
  const updateProductList = () => {
    $productInventory().replaceChildren(
      ...ProductManage.list().map((product) => productTemplate(product))
    );
  };

  const updateChargeAmount = () => {
    $chargeAmount().textContent = ProductPurchase.chargeAmount();
  };

  const initializeChargeFields = () => {
    $chargeAmountInput().value = null;
  };

  const initialize = () => {
    updateChargeAmount();
    updateProductList();
    initializeChargeFields();
  };

  const handleChargingAmount = (event) => {
    event.preventDefault();
    try {
      ProductPurchase.chargingAmount($chargeAmountInput().value);
      initialize();
    } catch (e) {
      alert(e.message);
    }
  };

  const handlePurchaseProduct = (target) => {
    const productElement = target.parentNode.parentNode;
    try {
      ProductPurchase.purchase(productElement.dataset);
      initialize();
    } catch (e) {
      alert(e.message);
    }
  };

  const contents = () => contentTemplate();

  return { contents, initialize, handleChargingAmount, handlePurchaseProduct };
})();
export default ProductPurchaseView;
