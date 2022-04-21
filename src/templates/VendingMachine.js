import { SELECTOR, HASH } from '../constants.js';

export const vendingMachineTemplate = () => String.raw`
  <div id="${SELECTOR.APP_ID}">
    <nav>
      <a id="${SELECTOR.PRODUCT_MANAGE_MENU_ID}" href="${HASH.PRODUCT_MANAGE_TAB}">
        <button>상품관리</button>
      </a>
      <a id="${SELECTOR.VENDING_MACHINE_MANAGE_MENU_ID}" href="${HASH.VENDING_MACHINE_MANAGE_TAB}">
        <button>잔돈충전</button>
      </a>
      <a id="${SELECTOR.PRODUCT_PURCHASE_MENU_ID}" href="${HASH.PRODUCT_PURCHASE_TAB}">
        <button>상품구매</button>
      </a>
    </nav>
    <main></main>
  </div>
`;
