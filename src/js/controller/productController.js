import { DEFAULT_TYPED_PRODUCT } from '../../constants/index.js';
import { VALIDATE } from '../../constants/validate.js';

class ProductController {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
  }

  validateButton() {
    const {
      typedProduct: { name, price, quantity },
    } = this.model.state;
    const isDisabled = name.length < VALIDATE.MIN_NAME_LENGTH || quantity <= VALIDATE.MIN_QUANTITY;

    this.view.renderAddButton({ isDisabled });
  }

  validatePrice({ price }) {
    if (price % 10 !== 0 || price < VALIDATE.MIN_PRICE)
      alert('유효하지 않은 가격입니다. 상품의 최소가격은 100원이며 10원으로 나누어 떨어져야 합니다.');
  }

  typeProductName = ({ name }) => {
    const currentState = this.model.state;

    this.model.setState({ ...currentState, typedProduct: { ...currentState.typedProduct, name } });

    this.view.renderProductNameInput({ name: this.model.state.typedProduct.name });
    this.validateButton();
  };

  typeProductPrice = ({ price }) => {
    const currentState = this.model.state;

    this.model.setState({ ...currentState, typedProduct: { ...currentState.typedProduct, price } });

    this.view.renderProductPriceInput({ price: this.model.state.typedProduct.price });
    this.validateButton();
  };

  typeProductQuantity = ({ quantity }) => {
    const currentState = this.model.state;

    this.model.setState({ ...currentState, typedProduct: { ...currentState.typedProduct, quantity } });

    this.view.renderProductQuantityInput({ quantity: this.model.state.typedProduct.quantity });
    this.validateButton();
  };

  clearTypedProduct = () => {
    const currentState = this.model.state;

    this.model.setState({
      ...currentState,
      typedProduct: { ...DEFAULT_TYPED_PRODUCT },
    });

    this.view.renderProductNameInput({ name: this.model.state.typedProduct.name });
    this.view.renderProductPriceInput({ price: this.model.state.typedProduct.price });
    this.view.renderProductQuantityInput({ quantity: this.model.state.typedProduct.quantity });
  };

  checkSameProduct = ({ products, typedProduct }) => {
    console.log('!@@@@', products, typedProduct);
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
    console.log({ newProducts });
    return newProducts;
  };

  addProduct = () => {
    const currentState = this.model.state;
    const { products, typedProduct } = currentState;
    const { price } = typedProduct;

    this.validatePrice({ price });

    this.model.setState({
      ...currentState,
      products: this.checkSameProduct({ products, typedProduct }),
    });

    this.view.renderProductList({ products: this.model.state.products });

    this.clearTypedProduct();
  };
}

export default ProductController;
