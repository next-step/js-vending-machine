export default class ProductPurchase {
    render() {
        document.querySelector("#app").replaceChildren();
        document.querySelector("#app").insertAdjacentHTML("afterbegin", this.#getTemplate());
    }

    #getTemplate() {
        return `<h3 id="product-purchase">상품구매</h3>`;
    }
}
