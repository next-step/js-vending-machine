const ProductAppender = () => `
        <form class="product-container" data-test="product-container">
            <input type="text" id="product-name-input" placeholder="상품명" data-test="product-name-input"/>
            <input type="number" id="product-price-input" placeholder="가격" data-test="product-price-input"/>
            <input type="number" id="product-quantity-input" placeholder="수량" data-test="product-quantity-input"/>
            <button id="product-add-button">추가하기</button>
        </form>`;

export default ProductAppender;
