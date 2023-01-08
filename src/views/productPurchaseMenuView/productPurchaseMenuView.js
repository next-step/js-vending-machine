import { getHTMLElementFromHTMLString } from "../common.js";

export function productPurchaseMenuInitiator(rootElement) {
  const baseElements = [
    ...getInsertCoinControllerTitle(),
    ...getProductPurchaseControllerTitle(),
    ...getRestCoinControllerTitle(),
  ];

  rootElement.append(...baseElements);
}

function getInsertCoinControllerTitle() {
  return getHTMLElementFromHTMLString('<h3>금액 투입</h3>')
}

function getProductPurchaseControllerTitle() {
  return getHTMLElementFromHTMLString('<h3>구매할 수 있는 상품 현황</h3>')
}

function getRestCoinControllerTitle() {
  return getHTMLElementFromHTMLString('<h3>잔돈</h3>')
}
