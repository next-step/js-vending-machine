import { newProductFormView, model, purchasableTableView } from '../index.js';
import { getProductId, validateNewProduct } from '../service/newProductService.js';

export class manageProductController {
  constructor() {
    newProductFormView.bindOnClickAddProductButton(this.onClickAddNewProductButton);
  }

  onClickAddNewProductButton = (event) => {
    event.preventDefault();

    const newProduct = validateNewProduct({
      id: getProductId(model.products),
      name: newProductFormView.$nameInput.value,
      price: newProductFormView.$priceInput.value,
      quantity: newProductFormView.$quantityInput.value,
    });

    model.setProducts(newProduct);
    newProductFormView.renderProducts();
    purchasableTableView.renderPurchasableTable();
  };
}
