import { $, $getElement } from '../../dom.js';

export default function ShowProduct(target, products) {
  render();

  function render() {
    target.appendChild($getElement(template()));
    const $productInventoryContainer = $('#product-inventory-container');

    products.forEach((product) => {
      $productInventoryContainer.appendChild(setProduct(product));
    });
  }

  function setProduct(product) {
    const $tr = document.createElement('tr');
    for (let data in product) {
      const $td = document.createElement('td');
      $td.innerText = product[data];
      $tr.appendChild($td);
    }

    return $tr;
  }

  function template() {
    return `
    <div>
        <h2>상품 현황</h2>
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
        <tbody id="product-inventory-container">
        </tbody>
        </table>
    <div>
    `;
  }
}
