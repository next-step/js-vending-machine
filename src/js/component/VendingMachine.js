import Products from "../domain/Products.js";
import { getProducts, setProducts } from "../service/index.js";
import Menus from "./Menus.js";
import ProductManage from "./ProductManage.js";

export default class VendingMachine {
    products;

    constructor() {
        this.products = new Products(getProducts());
        this.menu = new Menus({
            onProductManage: () => this.onProductManage(),
        });
        this.productManage = new ProductManage(this.products, {
            onAddProduct: (name, price, quantity) => this.onAddProduct(name, price, quantity),
        });
        this.onProductManage();
    }

    onProductManage() {
        this.productManage.setProductManage();
    }

    onAddProduct(name, price, quantity) {
        try {
            this.products.addProduct(name, price, quantity);
            this.productManage.onAddProduct();
            setProducts(this.products.value);
        } catch (error) {
            alert(error.message);
        }
    }
}
