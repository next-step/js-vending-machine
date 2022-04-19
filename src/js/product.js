export default function Product() {
  const productTemplate = /* HTML */ `<h3>상품 추가하기</h3>
    <div class="product-container">
      <input type="text" id="product-name-input" placeholder="상품명" />
      <input type="number" id="product-price-input" placeholder="가격" />
      <input type="number" id="product-quantity-input" placeholder="수량" />
      <button id="product-add-button">추가하기</button>
    </div>`;

  this.showProductContainer = () => {
    const app = document.querySelector('#app');
    app.innerHTML = productTemplate;
  };
}
