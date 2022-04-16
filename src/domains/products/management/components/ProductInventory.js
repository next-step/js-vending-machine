const ProductInventory = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { _ } = props;

  return `
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
};

export default ProductInventory;
