import Product from "./Product.js";

export default class Products {
<<<<<<< HEAD
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

        this.products.push(new Product(name, Number(price), Number(quantity)).data);
    }
}
=======
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
>>>>>>> 2d93b03 (상품 등록 검증 로직 추가)
