export const renderProductNameInput = ({ name }) => {
  document.querySelector('#product-name-input').value = name;
};

export const renderProductPriceInput = ({ price }) => {
  document.querySelector('#product-price-input').value = price;
};

export const renderProductQuantityInput = ({ quantity }) => {
  document.querySelector('#product-quantity-input').value = quantity;
};

export const renderProductInputElements = ({ name, price, quantity }) => {
  renderProductNameInput({ name });
  renderProductPriceInput({ price });
  renderProductQuantityInput({ quantity });
};

export const renderProductList = ({ products }) => {
  document.querySelector('#product-inventory-container').innerHTML = /* html */ `
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
};
