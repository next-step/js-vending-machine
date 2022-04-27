export const getProductsTemplate = () => {
  return `
    <h3>상품 추가하기</h3>
    <form class="product-container">
      <input type="text" name="product-name-input" placeholder="상품명" required />
      <input type="number" name="product-price-input" placeholder="가격" required min="1" />
      <input type="number" name="product-quantity-input" placeholder="수량" required min="1" />
      <div>
        <button id="product-add-button">추가하기</button>
        <button id="product-all-remove-button" type="button">전체 삭제</button>
      </div>
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
      <tbody id="product-inventory-container"></tbody>
    </table>
  `;
};

export const getProductListTemplate = (productManagement) => {
  if (!productManagement || productManagement.length < 1) {
    return '<td colspan="3">상품리스트가 존재하지 않습니다.</td>';
  }

  return `
    ${productManagement
      .map(
        (product) => `
        <tr>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.quantity}</td>
        </tr>
      `
      )
      .join('')}
  `;
};