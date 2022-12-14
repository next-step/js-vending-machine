class ProductView {
  nameInput = document.querySelector('#product-name-input');
  priceInput = document.querySelector('#product-price-input');
  quantityInput = document.querySelector('#product-quantity-input');
  addButton = document.querySelector('#product-add-button');
  inventoryContainer = document.querySelector('#product-inventory-container');

  renderProductNameInput({ name }) {
    this.nameInput.value = name;
  }

  renderProductPriceInput({ price }) {
    this.priceInput.value = price;
  }

  renderProductQuantityInput({ quantity }) {
    this.quantityInput.value = quantity;
  }

  renderProductList({ products }) {
    this.inventoryContainer.innerHTML = /* html */ `
    ${products
      .map((el) => {
        return `
        <tr>
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
