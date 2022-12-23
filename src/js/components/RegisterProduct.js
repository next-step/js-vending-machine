export default function RegisterProduct({ $target }) {
  const $div = document.createElement('div');
  this.$target = $target;
  this.$target.appendChild($div);

  this.render = () => {
    $div.innerHTML = `
			<h3>상품 추가하기</h3>
      <form class="add-product-form">
        <input type="text" data-cy="product-name-input" placeholder="상품명" />
        <input type="number" data-cy="product-price-input" placeholder="가격" />
        <input type="number" data-cy="product-quantity-input" placeholder="수량" />
        <input type="submit" class="btn" data-cy="product-add-button" value="추가하기" />
      </form>
      <hr />`;
  };

  this.render();
}
