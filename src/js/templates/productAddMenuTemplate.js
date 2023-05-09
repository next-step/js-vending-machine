import { BUTTON_NAME, PRODUCT_PROPERTIES, TITLE } from '../constants/common.js';
import SELECTOR from '../constants/selector.js';
import { createTableTh } from './common.js';

export const productAddInput = (id, type, text) => `
<input type="${type}" id="${id}" placeholder="${text}" />
`;

export const productAddFormTemplate = `
  <h3>${TITLE.PRODUCT_MANAGE.ADD}</h3>
  <div class="${SELECTOR.productContainer}">
    ${PRODUCT_PROPERTIES.map(it => productAddInput(it.id, it.type, it.text)).join('')}
    <button id="${SELECTOR.productAddButtonId}">${BUTTON_NAME.ADD}</button>
  </div>
`;

export const createProductTableItemTemplate = (name, price, quantity) => `
  <tr>
    <td class="${SELECTOR.productManageNameClass}">${name}</td>
    <td class="${SELECTOR.productManagePriceClass}">${price}</td>
    <td class="${SELECTOR.productManageQuantityClass}">${quantity}</td>
  </tr>
`;

export const createProductTableBodyTemplate = (products) => `
  ${products.map(it => createProductTableItemTemplate(it.name, it.price, it.quantity)).join('')}
`;

export const productTableTemplate = `
  <h3>${TITLE.PRODUCT_MANAGE.STATUS}</h3>
  <table class="${SELECTOR.productInventory}">
    <colgroup>
      <col style="width: 140px" />
      <col style="width: 100px" />
      <col style="width: 100px" />
    </colgroup>
    <thead>
      <tr>
        ${PRODUCT_PROPERTIES.map(it => createTableTh(it.text)).join('')}
      </tr>
    </thead>
    <tbody id="${SELECTOR.productInventoryContainer}">
      ${createProductTableBodyTemplate([])}
    </tbody>
  </table>
`;