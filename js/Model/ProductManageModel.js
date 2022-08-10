class ProductManageModel {
	#products;

	constructor() {
		this.#products = new Map();
	}

	get products() {
		return this.#products;
	}

	addProdcut({ productName, productPrice, productQuantity }) {
		if (productPrice < 0 || productQuantity < 0) {
			throw new Error("0 이상의 값을 입력해 주세요");
		}
		this.products.set(productName, { productPrice, productQuantity });
	}
}

export default new ProductManageModel();
