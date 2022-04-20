import Validation from './Validation.js';

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
    productAddButton.addEventListener('click', this.setLocalStorageProducts);
  };

  this.showInventory = () => {
    document.querySelector('#app').insertAdjacentHTML('beforeend', inventoryTemplate);
  };

  this.setLocalStorageProducts = () => {
    const products = this.getLocalStorageProducts();

    const productName = document.querySelector('#product-name-input').value;
    const productPrice = document.querySelector('#product-price-input').value;
    const productQuantity = document.querySelector('#product-quantity-input').value;

    if (!Validation.isEmptyProductInput(productName, productPrice, productQuantity)) {
      alert('상품명, 금액, 수량에는 공백을 입력할 수 없습니다.');
      return false;
    }

    if (!Validation.isUnder100Price(productPrice)) {
      alert('상품의 최소 가격은 100원입니다.');
      return false;
    }

    if (!Validation.isUnderMinQuantity(productQuantity)) {
      alert('상품의 최소 수량은 1개입니다.');
      return false;
    }

    products.push({
      name: productName,
      price: productPrice,
      quantity: productQuantity,
    });

    window.localStorage.setItem('products', JSON.stringify(products));

    this.renderProducts();
  };

  this.getLocalStorageProducts = () => {
    if (!window.localStorage.getItem('products')) {
      return [];
    }

    return JSON.parse(window.localStorage.getItem('products'));
  };

  this.renderProducts = () => {
    const products = this.getLocalStorageProducts();

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
