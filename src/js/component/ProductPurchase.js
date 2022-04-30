import VendingMachineCharge from "../domain/Cashbox.js";

export default class ProductPurchase {
    products;
    vendingMachineCharge;
    change;
    props;

    constructor(products, vendingMachineCharge, change, props) {
        this.products = products;
        this.vendingMachineCharge = vendingMachineCharge;
        this.change = change;
        this.props = props;
    }

    initialize() {
        this.#render();
        this.#mounted();
    }

    #render() {
        document.querySelector("#app").replaceChildren();
        document.querySelector("#app").insertAdjacentHTML("afterbegin", this.#getTemplate());
    }

    #mounted() {
        document.querySelector(`#charge-input-form`).addEventListener("submit", (event) => this.#onSubmit(event));
        document.querySelectorAll(".purchase-button").forEach((element) => {
            element.addEventListener("click", (event) => this.onPurchase(event));
        });
        document.querySelector("#coin-return-button").addEventListener("click", () => this.onCoinReturn());
    }

    onPurchase(event) {
        this.props.onPurchase(event.target.dataset.productName);
    }

    setCharge() {
        document.querySelector("#charge-amount").innerHTML = this.change.value;
    }

    onCoinReturn() {}

    #onSubmit(event) {
        event.preventDefault();
        this.#submit(document.querySelector("#charge-input").value);
    }

    #submit(charge) {
        this.props.onChargeChange(Number(charge));
    }

    #getTemplate() {
        return `
        ${this.#getChargeTemplate()}
        ${this.#getPurchaseProductTemplate()}
        ${this.#getChangeTemplate()}
        `;
    }

    setVendingMachineState() {
        this.setCharge();
    }

    #getChargeTemplate() {
        return `
        <div class="purchase-container">
            <h3>충전하기</h3>
            <div class="vending-machine-wrapper">
                <form id="charge-input-form">
                    <input type="number" name="charge-amount" id="charge-input" />
                    <button id="charge-button">충전하기</button>
                </form>
            </div>
            <p>충전 금액: <span id="charge-amount">${this.change.value}</span>원</p>
        </div>`;
    }

    #getPurchaseProductTemplate() {
        return `
        <h3 id="product-manage">구매할 수 있는 상품 현황</h3>
        <table class="product-inventory">
            <colgroup>
                <col style="width: 140px" />
                <col style="width: 100px" />
                <col style="width: 100px" />
                <col style="width: 100px" />
            </colgroup>
            <thead>
                <tr>
                    <th>상품명</th>
                    <th>가격</th>
                    <th>수량</th>
                    <th>구매</th>
                </tr>
            </thead>
            <tbody id="product-inventory-container">
            ${this.products.value.map((product) => this.#getProductTemplate(product)).join("")}
            </tbody>
        </table>
        `;
    }

    #getProductTemplate(product) {
        return `<tr>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.quantity}</td>
                    <td>
                        <button class="purchase-button" data-product-name=${product.name}>구매하기</button>
                    </td>
                </tr>`;
    }

    #getChangeTemplate() {
        return `
        <h3>잔돈</h3>
        <button id="coin-return-button">반환하기</button>
        <table class="cashbox-remaining">
            <colgroup>
                <col />
                <col />
            </colgroup>
            <thead>
                <tr>
                    <th>동전</th>
                    <th>개수</th>
                </tr>
            </thead>
            <tbody>
                ${VendingMachineCharge.COINS.map((coin) => this.#getCoinTemplate(coin)).join("")}
            </tbody>
        </table>`;
    }

    #getCoinTemplate(coin) {
        return `
            <tr>
                <td>${coin}원</td>
                <td id="vending-machine-coin-${coin}-quantity">
                ${this.vendingMachineCharge.coins[coin] === 0 ? "" : this.vendingMachineCharge.coins[coin] + "개"}
                </td>
            </tr>
        `;
    }
}
