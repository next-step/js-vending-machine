import Product from "./Product.js";

export default class Products {
    products = [];

    constructor(products) {
        if (products) this.setProducts(products);
    }

    get value() {
        return this.products;
    }

    setProducts(products) {
        products.forEach((product) => {
            this.addProduct(product.name, product.price, product.quantity);
        });
    }

    addProduct(name, price, quantity) {
        const findIndex = this.products.findIndex((product) => product.name === name);

        if (findIndex > -1) {
            this.products[findIndex] = {
                name,
                price,
                quantity,
            };
            return;
        }

        this.products.push(new Product(name, Number(price), Number(quantity)));
    }
}
