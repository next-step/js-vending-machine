import View from '../abstract.js';
import { Actions } from '../../store/actions.js';
import el from '../../util/dom.js';
import InventoryItems from './inventoryItems.js';
export default class ProductInventory extends View {
    static #template = /* html */ `
    <fragment>
      <h3>상품 추가/수정</h3>
      <form id="product-form" class="product-container">
        <input type="text" name="name" id="product-name-input" placeholder="상품명" autofocus required />
        <input type="number" name="price" id="product-price-input" min="100"  placeholder="가격" required step="10" />
        <input type="number" name="quantity" id="product-quantity-input" min="1" placeholder="수량" required />
        <button type="submit" id="product-add-button">추가하기</button>
      </form>
      
      <h3>상품 현황</h3>
      <table class="product-inventory margin-auto">
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
    </fragment>
  `;
    $form;
    $inputs;
    $inventoryContainer;
    #inventory = new InventoryItems();
    constructor() {
        super();
        const $content = el(ProductInventory.#template);
        this.$form = $content.querySelector('#product-form');
        this.$inputs = Array.from(this.$form.querySelectorAll('input'));
        this.$inventoryContainer = $content.querySelector('#product-inventory-container');
        this.$form?.addEventListener('submit', this.onSubmit);
        this.render($content);
    }
    watch = ({ inventory }) => ({ inventory });
    onStoreUpdated({ inventory }) {
        this.$form.reset();
        this.$inputs[0].focus();
        const res = this.#inventory.update(inventory);
        el(this.$inventoryContainer, res);
    }
    onSubmit = (e) => {
        e.preventDefault();
        const formDataEntries = new FormData(this.$form).values();
        this.dispatch(Actions.inventory_addProduct, {
            name: formDataEntries.next().value,
            price: parseInt(formDataEntries.next().value),
            amount: parseInt(formDataEntries.next().value),
        });
    };
}
customElements.define('product-inventory', ProductInventory);
//# sourceMappingURL=index.js.map