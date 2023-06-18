import {
  PURCHASE_BUTTON_NAME,
  CASHBOX_CHANGE_TH,
  CHARGE_AMOUNT_BUTTON_NAME,
  COIN_RETURN_BUTTON_NAME,
  PURCHASE_PRODUCT_TABLE_TH,
  TITLE,
} from '../constants/common.js';
import SELECTOR from '../constants/selector.js';
import { createTableTh } from './common.js';

export const inputAmountTemplate = `
<div class='${SELECTOR.purchaseContainer}'>
  <h3>${TITLE.PRODUCT_PURCHASE_MENU.INPUT_AMOUNT}</h3>
  <div class='${SELECTOR.vendingMachineWapper}'>
    <input placeholder='투입할 금액' type="text" id='${SELECTOR.chargeInputId}'/>
    <button id='${SELECTOR.chargeButtonId}'>${CHARGE_AMOUNT_BUTTON_NAME}</button>
    <p>
      투입한 금액: <span id='${SELECTOR.chargeAmountId}'>0</span>원 
    </p>
  </div>  
</div>
`;

export const purchaseProductTabelTemplate = `
  <table class='${SELECTOR.purchaseAvailable}'>
    <thead>
      <tr>
        ${PURCHASE_PRODUCT_TABLE_TH.map((it) => createTableTh(it)).join('')}
      </tr>
    </thead>
    <tbody id='${SELECTOR.purchaseProductTableBodyId}'></tbody>
  </table>
`;

export const coinReturnTemplate = `
<h3>잔돈</h3>
<button id="${SELECTOR.coinReturnButtonId}">${COIN_RETURN_BUTTON_NAME}</button>
<table class="${SELECTOR.cashboxChange}">
	<thead>
		<tr>
      ${CASHBOX_CHANGE_TH.map((it) => createTableTh(it)).join('')}
		</tr>
	</thead>
	<tbody id="${SELECTOR.returnCoinTableBodyId}">
		<tr>
			<td>500원</td>
			<td id="${SELECTOR.coin500QuantityId}"></td>
		</tr>
		<tr>
			<td>100원</td>
			<td id="${SELECTOR.coin100QuantityId}"></td>
		</tr>
		<tr>
			<td>50원</td>
			<td id="${SELECTOR.coin50QuantityId}"></td>
		</tr>
		<tr>
			<td>10원</td>
			<td id="${SELECTOR.coin10QuantityId}"></td>
		</tr>
	</tbody>
</table>
`;

export const purchaseProductItem = (products) => `
  ${products
    .map(
      (it) => `
      <tr>
        <td class='${SELECTOR.productPurchaseNameClass}'>${it.name}</td>
        <td class='${SELECTOR.productPurchasePriceClass}'>${it.price}</td>
        <td class='${SELECTOR.productPurchaseQuantityClass}'>${it.quantity}</td>
        <td>
          <button class='${SELECTOR.purchaseButtonClass}'>${PURCHASE_BUTTON_NAME}</button>
        </td>
      </tr>`
    )
    .join('')}
`;
