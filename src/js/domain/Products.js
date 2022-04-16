import Product from "./Product.js";

export default class Products {
    products;

    constructor(products) {
        console.log(products);
        if(products) this.setProducts(products);
    }

    setProducts(products) {
        let test = products.map((product) => new Product(product.name, product.price, product.amount));
    }

    addProduct(name, price, amount) {
        this.products.push(new Product(name, price, amount));
    }
}