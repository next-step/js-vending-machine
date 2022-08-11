import AbstractObserver from "../../util/observer/AbstractObserver.js";

import MainViewController from "../../Controller/MainViewController.js";
import ProductManageController from "../../Controller/ProductManageController.js";

import { $ } from "../../util/dom.js";
import { NOTIFY_KEY } from "../../util/constants.js";

class ProductManageView extends AbstractObserver {
	constructor(target) {
		super();
		this.$target = target;

		this.initObserver();
	}

	static productManageTemplate = /* html */ `
            <div class="product-manage-tab">
                <div class="product-container">
                    <h3>상품 추가하기</h3>
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
                    </tbody>
                </table>
            </div>
        `;

	static productItem(productName, productPrice, productQuantity) {
		return /* html */ `
            <tr>
                <td>${productName}</td>
                <td>${productPrice}</td>
                <td>${productQuantity}</td>
            </tr>
        `;
	}

	initObserver() {
		this.productManageController = ProductManageController;
		this.productManageController.registerObserver(this);

		this.mainViewController = MainViewController;
		this.mainViewController.registerObserver(this);
	}

	bindDom() {
		this.$productNameInput = $("#product-name-input");
		this.$productPriceInput = $("#product-price-input");
		this.$productQuantityInput = $("#product-quantity-input");
		this.$productAddBtn = $("#product-add-button");
		this.$productTableBody = $("#product-inventory-container");
	}

	bindEvent() {
		this.$productAddBtn.addEventListener("click", this.onAddProduct);
	}

	onAddProduct = () => {
		const productName = this.$productNameInput.value;
		const productPrice = this.$productPriceInput.valueAsNumber;
		const productQuantity = this.$productQuantityInput.valueAsNumber;

		const productInfo = {
			productName,
			productPrice,
			productQuantity,
		};

		try {
			this.productManageController.handleAddProduct(productInfo);
		} catch (error) {
			alert(error);
		}
	};

	renderProductList(products) {
		const $productList = [...products]
			.map(([productName, { productPrice, productQuantity }]) =>
				ProductManageView.productItem(productName, productPrice, productQuantity)
			)
			.join("");

		this.$productTableBody.innerHTML = "";
		this.$productTableBody.insertAdjacentHTML("beforeend", $productList);
	}

	render() {
		const $producrManageTab = $(".product-manage-tab");

		if ($producrManageTab) this.$target.removeChild($producrManageTab);

		this.$target.insertAdjacentHTML("beforeend", ProductManageView.productManageTemplate);

		this.bindDom();
		this.bindEvent();
	}

	update(key, ...args) {
		switch (key) {
			case NOTIFY_KEY.ADD_PRODUCT:
			case NOTIFY_KEY.FETCH_PRODUCT: {
				this.renderProductList(...args);
				break;
			}
		}
	}
}

export default ProductManageView;
