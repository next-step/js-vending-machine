import { $ELEMENT } from '../../constants/element.js';

class ProductView {
  nameInput = document.querySelector($ELEMENT.NAME_INPUT);
  priceInput = document.querySelector($ELEMENT.PRICE_INPUT);
  quantityInput = document.querySelector($ELEMENT.QUANTITY_INPUT);
  addButton = document.querySelector($ELEMENT.ADD_BUTTON);
  inventoryContainer = document.querySelector($ELEMENT.INVENTORY_CONTAINER);

  renderProductNameInput({ name }) {
    this.nameInput.value = name;
  }

  renderProductPriceInput({ price }) {
    this.priceInput.value = price;
  }

  renderProductQuantityInput({ quantity }) {
    this.quantityInput.value = quantity;
  }

  renderAddButton({ isDisabled }) {
    isDisabled ? this.addButton.setAttribute('disabled', '') : this.addButton.removeAttribute('disabled');
  }

  renderProductList({ products }) {
    this.inventoryContainer.innerHTML = /* html */ `
    ${products
      .map((el) => {
        return `
        <tr class=".product-inventory-list">
          <td>${el.name}</td>
          <td>${el.price}</td>
          <td>${el.quantity}</td>
        </tr>
      `;
      })
      .join('')}
`;
  }
}

export default ProductView;
