export default class ProductManage {
    products;
    props;

    constructor(products, props) {
        this.products = products;
        this.props = props;
    }
    setProductManage() {
        this.#render();
        this.#mounted();
    }

    #render() {
        document.querySelector("#app").replaceChildren();
        document.querySelector("#app").insertAdjacentHTML("afterbegin", this.#getTemplate());
    }

    #mounted() {
        this.$productNameInput = document.querySelector("#product-name-input");
        this.$productPriceInput = document.querySelector("#product-price-input");
        this.$productQuantityInput = document.querySelector("#product-quantity-input");
        this.$productcontainerForm = document.querySelector("#product-container-form");

        document
            .querySelector("#product-input-form")
            .addEventListener("submit", (event) => this.#onSubmitProduct(event));
    }

    #onSubmitProduct(event) {
        event.preventDefault();

        this.props.onAddProduct(
            this.$productNameInput.value,
            this.$productPriceInput.value,
            this.$productQuantityInput.value
        );
    }

    onAddProduct() {
        const product = {
            name: this.$productNameInput.value,
            price: this.$productPriceInput.value,
            quantity: this.$productQuantityInput.value,
        };

        if (document.querySelector(`[data-product-name="${this.$productNameInput.value}"]`)) {
            this.#replaceProduct(product);
        } else {
            this.#appendProduct(product);
        }

        this.#clearInputForm();
    }

    #clearInputForm() {
        this.$productNameInput.value = "";
        this.$productPriceInput.value = "";
        this.$productQuantityInput.value = "";
    }

    #replaceProduct(product) {
        const newProductElement = document.createElement("template");
        newProductElement.innerHTML = this.#getProductTemplate(product);
        document
            .querySelector(`[data-product-name="${product.name}"]`)
            .parentNode.replaceChild(
                newProductElement.content.firstChild,
                document.querySelector(`[data-product-name="${product.name}"]`)
            );
    }

    #appendProduct(product) {
        document
            .querySelector("#product-inventory-container")
            .insertAdjacentHTML("beforeend", this.#getProductTemplate(product));
    }

    #getTemplate() {
        return `
        <h3 id="product-manage">상품 추가하기</h3>
        <div class="product-container">
            <form id="product-input-form">
                <input autofocus type="text" id="product-name-input" placeholder="상품명" />
                <input type="number" id="product-price-input" placeholder="가격" />
                <input type="number" id="product-quantity-input" placeholder="수량" />
                <button id="product-add-button">추가하기</button>
            </form>            
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
            ${this.products.value.map((product) => this.#getProductTemplate(product)).join("")}
            
            </tbody>
        </table>`;
    }

    #getProductTemplate(product) {
        return `<tr data-product-name=${product.name}>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.quantity}</td>
                </tr>`;
    }
}
