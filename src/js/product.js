import { getLocalStorageProducts, setLocalStorageProducts } from './store.js';
import { clearProductInputs, validateProductInputs } from './Utils.js';

export default function Product() {
  const productTemplate =
    /* HTML */
    `<h3>상품 추가하기</h3>
      <div class="product-container">
        <input type="text" id="product-name-input" placeholder="상품명" />
        <input type="number" id="product-price-input" placeholder="가격" />
        <input type="number" id="product-quantity-input" placeholder="수량" />
        <button id="product-add-button">추가하기</button>
      </div>`;

  const inventoryTemplate =
    /* HTML */
    `<h3>상품 현황</h3>
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
        <tbody id="product-inventory-container"></tbody>
      </table>`;

  this.showProductContainer = () => {
    document.querySelector('#app').insertAdjacentHTML('afterbegin', productTemplate);

    const productAddButton = document.querySelector('#product-add-button');
    productAddButton.addEventListener('click', this.addProductToInventory);
  };

  this.showInventory = () => {
    document.querySelector('#app').insertAdjacentHTML('beforeend', inventoryTemplate);
  };

  this.addProductToInventory = () => {
    const products = getLocalStorageProducts();

    const productName = document.querySelector('#product-name-input').value;
    const productPrice = document.querySelector('#product-price-input').value;
    const productQuantity = document.querySelector('#product-quantity-input').value;

    validateProductInputs(productName, productPrice, productQuantity);

    const duplicatedProductNameIndex = products.findIndex(product => product.name === productName);
    console.log(`중복되는 상품명의 위치 : ${duplicatedProductNameIndex}`);

    if (duplicatedProductNameIndex !== -1) {
      products[duplicatedProductNameIndex].price = productPrice;
      products[duplicatedProductNameIndex].quantity = productQuantity;
    } else {
      products.push({
        name: productName,
        price: productPrice,
        quantity: productQuantity,
      });
    }

    setLocalStorageProducts(products);

    clearProductInputs();

    this.renderProducts();
  };

  this.renderProducts = () => {
    const products = getLocalStorageProducts();

    if (products.length === 0) {
      document.querySelector('#product-inventory-container').innerHTML =
        /* HTML */
        `
          <tr>
            <td colspan="3">등록된 상품이 없습니다.</td>
          </tr>
        `;
      return;
    }

    const productsTemplate = products
      .map(
        product =>
          /* HTML */
          `
            <tr>
              <td class="product-manage-name">${product.name}</td>
              <td class="product-manage-price">${product.price}</td>
              <td class="product-manage-quantity">${product.quantity}</td>
            </tr>
          `
      )
      .join('');

    document.querySelector('#product-inventory-container').innerHTML = productsTemplate;
  };
}
