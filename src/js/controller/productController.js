import { DEFAULT_TYPED_PRODUCT } from '../../constants/index.js';

class ProductController {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
  }

  typeProductName = ({ name }) => {
    const currentState = this.model.state;

    this.model.setState({ ...currentState, typedProduct: { ...currentState.typedProduct, name } });

    this.view.renderProductNameInput({ name: this.model.state.typedProduct.name });
  };

  typeProductPrice = ({ price }) => {
    const currentState = this.model.state;

    this.model.setState({ ...currentState, typedProduct: { ...currentState.typedProduct, price } });

    this.view.renderProductPriceInput({ price: this.model.state.typedProduct.price });
  };

  typeProductQuantity = ({ quantity }) => {
    const currentState = this.model.state;

    this.model.setState({ ...currentState, typedProduct: { ...currentState.typedProduct, quantity } });

    this.view.renderProductQuantityInput({ quantity: this.model.state.typedProduct.quantity });
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

  addProduct = () => {
    const currentState = this.model.state;
    const { products, typedProduct } = currentState;
    //*TODO: need validation here
    const newProducts = [...products, typedProduct];

    this.model.setState({
      ...currentState,
      products: newProducts,
    });

    this.view.renderProductList({ products: this.model.state.products });

    this.clearTypedProduct();
  };
}

export default ProductController;
