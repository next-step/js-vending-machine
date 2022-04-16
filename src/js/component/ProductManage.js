import Product from "../domain/Product.js";

export default class ProductManage {
    products;

    constructor(products) {
        console.log(products);
        this.products = products.products ? products.products : [];
    }

    setProductManage() {
        this.#render();
        this.#mounted();
    }

    #render() {
        document.querySelector("#app").innerHTML = this.#getTemplate();
    }

    #mounted() {
        this.$productNameInput = document.querySelector("#product-name-input");
        this.$productPriceInput = document.querySelector("#product-price-input");
        this.$productQuantityInput = document.querySelector("#product-quantity-input");

        document.querySelector("#product-add-button").addEventListener("click", () => this.onAddProduct());
    }

    onAddProduct() {
        try {
            //const product = new Product(this.$productNameInput.value, this.$productPriceInput.value, this.$productQuantityInput.value);
            this.products.addProduct(this.$productNameInput.value, this.$productPriceInput.value, this.$productQuantityInput.value);
        } catch(error) {
            alert(error.message);
        }
    }

    #getTemplate() {
        return `
        <h3>상품 추가하기</h3>
        <div class="product-container">
            <input type="text" id="product-name-input" placeholder="상품명" />
            <input type="number" id="product-price-input" placeholder="가격" />
            <input type="number" id="product-quantity-input" placeholder="수량" />
            <button id="product-add-button">추가하기</button>
        </div>
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
            ${this.products.map((product) => this.#getProductTemplate(product)).join("")}
            </tbody>
        </table>`
    }

    #getProductTemplate(product) {
        return `
            <tr>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.amount}</td>
            </tr>
        `;
    }
}