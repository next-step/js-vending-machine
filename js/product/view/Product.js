import { createFragmentWithTemplate, $ } from '../../utils/dom.js';
import { addProduct, RANGE } from '../helper/product.js';

const Product = ($app, store) => {
  const $frag = createFragmentWithTemplate(productTemplate(RANGE));

  const $form = $('form', $frag);
  const $productList = $('#product-inventory-container', $frag);

  const handleProductSubmit = (event) => {
    event.preventDefault();

    const newProducts = addProduct(
      Object.fromEntries(new FormData($form)),
      store.getState('products')
    );

    store.dispatch({
      products: newProducts,
    });
  };

  const renderProductList = ({ products }) => {
    if (!products) return;
    $productList.innerHTML = products.map(productRow).join('');
  };

  const init = () => {
    const products = store.getState('products');
    products && renderProductList({ products });

    store.subscribe(renderProductList);
    $form.addEventListener('submit', handleProductSubmit);
  };

  init();

  return {
    $app,
    $frag,
  };
};

const productTemplate = ({ MAX_PRICE, MIN_PRICE, MAX_COUNT, MIN_COUNT }) => `
  <h3>상품 추가하기</h3>
  <form class="product-container">
    <fieldset>
      <input required="true" type="text" id="product-name-input" name="name" placeholder="상품명" />
      <input required="true" type="number" id="product-price-input" name="price" placeholder="가격" min=${MIN_PRICE} max=${MAX_PRICE} />
      <input required="true" type="number" id="product-quantity-input" name="count" placeholder="수량" min=${MIN_COUNT} max=${MAX_COUNT} />
      <button type="submit" id="product-add-button">추가하기</button>
    </fieldset>
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

const productRow = ({ name, price, count }) => `
  <tr>
    <td>${name}</td>
    <td>${price}</td>
    <td>${count}</td>
  </tr>
`;

export default Product;
