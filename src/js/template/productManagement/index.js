import store from '../../store/index.js';

export const render = () => {};

export const getProductsTemplate = () => {
  const productManagement = store.getState()?.productManagement;

  return `
    <h3>상품 추가하기</h3>
    <form class="product-container">
      <input type="text" name="product-name-input" placeholder="상품명" required />
      <input type="number" name="product-price-input" placeholder="가격" required min="1" />
      <input type="number" name="product-quantity-input" placeholder="수량" required min="1" />
      <button id="product-add-button">추가하기</button>
    </form>
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
      ${productManagement
        ?.map(
          (product) => `
          <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
          </tr>
        `
        )
        .join('')}
      </tbody>
    </table>
  `;
};
