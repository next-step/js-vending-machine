import { getStorageProducts, setStorageProducts } from '../utils/storage.js';

class ProductManageModel {
  #product;

  constructor(product) {
    this.#product = product;
  }

  handleProducts() {
    const hasProductInStorage = !!getStorageProducts().length;

    if (hasProductInStorage) {
      this.#updateProducts();
    } else {
      this.#setProducts([this.#product]);
    }
  }

  #setProducts(data) {
    setStorageProducts(data);
  }

  #updateProducts(product) {
    const isDuplicateProduct = this.#isDuplicateProduct();
    const storageProducts = getStorageProducts();

    if (isDuplicateProduct) {
      const newProducts = storageProducts.map((it) => {
        if (it.name === this.#product.name) {
          it = this.#product;
        }

        return it;
      });

      setStorageProducts(newProducts);
    } else {
      const newProducts = [...storageProducts];
      newProducts.push(this.#product);

      this.#setProducts(newProducts);
    }
  }

  #isDuplicateProduct() {
    const storageProducts = getStorageProducts();
    return storageProducts.findIndex((it) => it.name === this.#product.name) !== -1;
  }
}
export default ProductManageModel;
