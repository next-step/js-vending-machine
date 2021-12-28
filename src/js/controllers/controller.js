import { NewProductForm } from '../views/NewProductForm.js';
import {
  addNewProductToInventory,
  findSameProductId,
  updateProduct,
  validateNewProduct,
} from '../service/newProductService.js';

export default class Controller {
  constructor(model) {
    this.model = model;

    this.NewProductForm = new NewProductForm();

    this.NewProductForm.bindOnClickAddProductButton(this.onClickAddNewProductButton);
  }

  onClickAddNewProductButton = (event) => {
    event.preventDefault();

    const newProduct = validateNewProduct({
      name: this.NewProductForm.$nameInput.value,
      price: this.NewProductForm.$priceInput.value,
      quantity: this.NewProductForm.$quantityInput.value,
    });

    const sameProductId = findSameProductId(this.model.products, newProduct);
    const existSameProduct = sameProductId >= 0;

    if (existSameProduct) {
      updateProduct(this.model, this.NewProductForm, newProduct, sameProductId);
      return;
    }

    addNewProductToInventory(this.model, this.NewProductForm, newProduct);
  };
}
