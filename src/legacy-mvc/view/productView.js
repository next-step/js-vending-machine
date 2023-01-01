import { $ELEMENT } from '../../constants/element.js';

class ProductView {
  $nameInput = document.querySelector($ELEMENT.NAME_INPUT);
  $priceInput = document.querySelector($ELEMENT.PRICE_INPUT);
  $quantityInput = document.querySelector($ELEMENT.QUANTITY_INPUT);
  $addButton = document.querySelector($ELEMENT.ADD_BUTTON);
  $inventoryContainer = document.querySelector($ELEMENT.INVENTORY_CONTAINER);

  renderProductNameInput = ({ name }) => {
    this.$nameInput.value = name;
  };

  renderProductPriceInput = ({ price }) => {
    this.$priceInput.value = price;
  };

  renderProductQuantityInput = ({ quantity }) => {
    this.$quantityInput.value = quantity;
  };

  renderAddButton = ({ isDisabled }) => {
    isDisabled ? this.$addButton.setAttribute('disabled', '') : this.$addButton.removeAttribute('disabled');
  };

  renderProductList = ({ products }) => {
    this.$inventoryContainer.innerHTML = /* html */ `
    ${products
      .map(({ name, price, quantity }) => {
        return `
        <tr class=".product-inventory-list">
          <td>${name}</td>
          <td>${price}</td>
          <td>${quantity}</td>
        </tr>
      `;
      })
      .join('')}
`;
  };

  addInputEventListeners = ({ typeProductName, typeProductPrice, typeProductQuantity }) => {
    const { $nameInput, $priceInput, $quantityInput } = this;

    $nameInput.addEventListener('keyup', (event) => {
      typeProductName({ name: event.target.value });
    });

    $priceInput.addEventListener('keyup', (event) => {
      typeProductPrice({ price: event.target.value });
    });

    $quantityInput.addEventListener('keyup', (event) => {
      typeProductQuantity({ quantity: event.target.value });
    });
  };

  addClickEventListeners = ({ addProduct }) => {
    const { $addButton } = this;

    $addButton.addEventListener('click', () => {
      addProduct();
    });
  };
}

export default ProductView;
