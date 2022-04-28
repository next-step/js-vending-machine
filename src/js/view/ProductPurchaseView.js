import { FORM } from '../constants/content-constant.js';
import { PURCHASE } from '../constants/purchase-constant.js';
import ProductPurchase from '../ProductPurchase.js';

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

const $chargeAmountInput = () => document.querySelector('#charge-input');
const $chargeAmount = () => document.querySelector('#charge-amount');

const ProductPurchaseView = (() => {
  const updateChargeAmount = () => {
    $chargeAmount().textContent = ProductPurchase.chargeAmount();
  };

  const initialize = () => {
    updateChargeAmount();
    $chargeAmountInput().value = null;
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

  const contents = () => chargeAmountTemplate();

  return { contents, handleChargingAmount };
})();
export default ProductPurchaseView;
