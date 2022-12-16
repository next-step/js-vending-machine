import { ALERT } from '../../constants/alert.js';
import { VALIDATE } from '../../constants/validate.js';

class ProductController {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;

    this.view.addInputEventListeners({
      typeProductName: this.typeProductName,
      typeProductPrice: this.typeProductPrice,
      typeProductQuantity: this.typeProductQuantity,
    });

    this.view.addClickEventListeners({ addProduct: this.addProduct });
  }

  validateButton = ({ typedProduct }) => {
    const { name, quantity } = typedProduct;
    const isDisabled = name.length < VALIDATE.MIN_NAME_LENGTH || quantity <= VALIDATE.MIN_QUANTITY;

    this.view.renderAddButton({ isDisabled });
  };

  validatePrice = ({ price }) => {
    if (price % 10 !== 0 || price < VALIDATE.MIN_PRICE) {
      alert(ALERT.PRICE_VALIDATION);
      return false;
    }
    return true;
  };

  checkSameProduct = ({ products, typedProduct }) => {
    let isModified = false;

    const newProducts = products.map((product) => {
      const { name } = product;
      if (name === typedProduct.name) {
        isModified = true;
        return {
          name,
          price: typedProduct.price,
          quantity: typedProduct.quantity,
        };
      } else {
        return product;
      }
    });

    if (!isModified) return [...newProducts, typedProduct];

    return newProducts;
  };

  typeProductName = ({ name }) => {
    this.model.addCurrentName({ name });

    const { typedProduct } = this.model.state;

    this.view.renderProductNameInput({ name: typedProduct.name });
    this.validateButton({ typedProduct });
  };

  typeProductPrice = ({ price }) => {
    this.model.addCurrentPrice({ price });

    const { typedProduct } = this.model.state;

    this.view.renderProductPriceInput({ price: typedProduct.price });
    this.validateButton({ typedProduct });
  };

  typeProductQuantity = ({ quantity }) => {
    this.model.addCurrentQuantity({ quantity });

    const { typedProduct } = this.model.state;

    this.view.renderProductQuantityInput({ quantity: typedProduct.quantity });
    this.validateButton({ typedProduct });
  };

  clearTypedProduct = () => {
    this.model.clearTypedValue();

    const { typedProduct } = this.model.state;

    this.view.renderProductNameInput({ name: typedProduct.name });
    this.view.renderProductPriceInput({ price: typedProduct.price });
    this.view.renderProductQuantityInput({ quantity: typedProduct.quantity });
  };

  addProduct = () => {
    const currentState = this.model.state;
    const { products, typedProduct } = currentState;
    const { price } = typedProduct;

    if (!this.validatePrice({ price })) return;

    this.model.addProduct(this.checkSameProduct({ products, typedProduct }));

    this.view.renderProductList({ products: this.model.state.products });

    this.clearTypedProduct();
  };
}

export default ProductController;
