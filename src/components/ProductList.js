import Component from "../core/Component.js";
import { $ } from "../utils/dom.js";

export default class ProductList extends Component {
  template() {
    return /*html*/ `
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
    `;
  }

  mounted() {
    const products = this.$props.products;
    const template = products
      .map((product) => {
        return `
        <tr>
            <td>${product.name}</td>
            <td>${product.price}원</td>
            <td>${product.quantity}개</td>
        </tr>
      `;
      })
      .join("");
    $("#product-inventory-container", this.$target).innerHTML = template;
  }
}
