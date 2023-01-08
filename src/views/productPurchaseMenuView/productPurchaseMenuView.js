import { getHTMLElementFromHTMLString } from "../common.js";
import { createCoinInputController } from "./coinInputController.js";
import { createCoinInputDisplay } from "./CoinInputDisplay.js";
import { createProductList } from "./ProductList.js";
import { createRestAmountFlushButton } from "./RestAmountFlushButton.js";
import { createRestAmountFlushDisplay } from "./RestAmountFlushDisplay.js";

export function productPurchaseMenuInitiator(rootElement) {
  const $coinInputController = createCoinInputController({
    children: getCoinInputControllerElements(),
    dynamicElementSelectors: {
      coinInput: '#coin-input',
      coinSubmitButton: '#coin-submit-button'
    },
    attributes: {
      className: 'd-flex',
    },
  });

  const $coinInputDisplay = createCoinInputDisplay({
    children: getCoinInputDisplayElements(),
    dynamicElementSelectors: {
      insertAmount: '#insert-amount',
    },
  });

  const $productList = createProductList({
    attributes: {
      id: 'product-list',
    },
  });

  const $productPurchaseController = Array.from(getProductPurchaseController()).find((el) => el instanceof HTMLElement);
  $productPurchaseController.appendChild($productList);

  const $restAmountFlushButton = createRestAmountFlushButton({
    children: '반환하기',
    attributes: {
      id: 'rest-amount-flush-button',
    },
  });

  const $restAmountFlushDisplay = createRestAmountFlushDisplay({
    children: getRestAmountFlushDisplayElements(),
    dynamicElementSelectors: {
      coin500: '#rest-coin-500-quantity',
      coin100: '#rest-coin-100-quantity',
      coin50: '#rest-coin-50-quantity',
      coin10: '#rest-coin-10-quantity',
    }
  });

  const baseElements = [
    ...getInsertCoinControllerTitle(),
    $coinInputController,
    $coinInputDisplay,
    ...getProductPurchaseControllerTitle(),
    $productPurchaseController,
    ...getRestAmountFlushControllerTitle(),
    $restAmountFlushButton,
    $restAmountFlushDisplay,
  ];

  rootElement.append(...baseElements);

  return {
    coinInputController: $coinInputController,
    coinInputDisplay: $coinInputDisplay,
    productList: $productList,
    restAmountFlushButton: $restAmountFlushButton,
    restAmountFlushDisplay: $restAmountFlushDisplay,
  }
}

function getInsertCoinControllerTitle() {
  return getHTMLElementFromHTMLString('<h3>금액 투입</h3>')
}

function getCoinInputControllerElements() {
  return getHTMLElementFromHTMLString(`
    <input type="number" id="coin-input"></input>
    <button id="coin-submit-button">투입하기</button>
  `);
}

function getCoinInputDisplayElements() {
  return getHTMLElementFromHTMLString(`
    투입한 금액: <span id="insert-amount">0</span>
  `);
}

function getProductPurchaseControllerTitle() {
  return getHTMLElementFromHTMLString('<h3>구매할 수 있는 상품 현황</h3>')
}

function getProductPurchaseController() {
  return getHTMLElementFromHTMLString(`
    <table class="product-inventory" id="product-purchase-controller">
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
    </table>
  `);
}

function getRestAmountFlushControllerTitle() {
  return getHTMLElementFromHTMLString(`
    <h3>잔돈</h3>
  `);
}

function getRestAmountFlushDisplayElements() {
  return getHTMLElementFromHTMLString(`
    <table class="cashbox-remaining">
      <colgroup>
        <col />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th>동전</th>
          <th>개수</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>500원</td>
          <td id="rest-coin-500-quantity">0</td>
        </tr>
        <tr>
          <td>100원</td>
          <td id="rest-coin-100-quantity">0</td>
        </tr>
        <tr>
          <td>50원</td>
          <td id="rest-coin-50-quantity">0</td>
        </tr>
        <tr>
          <td>10원</td>
          <td id="rest-coin-10-quantity">0</td>
        </tr>
      </tbody>
    </table>
  `);
}
