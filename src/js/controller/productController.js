import { DEFAULT_TYPED_PRODUCT } from '../../constants/index.js';
import veningMachineModel from '../model/index.js';
import {
  renderProductInputElements,
  renderProductList,
  renderProductNameInput,
  renderProductPriceInput,
  renderProductQuantityInput,
} from '../view/productView.js';

const model = veningMachineModel;

export const typeProductName = ({ name }) => {
  const currentState = model.getState();

  model.setState({ ...currentState, typedProduct: { ...currentState.typedProduct, name } });

  renderProductNameInput({ name });
};

export const typeProductPrice = ({ price }) => {
  const currentState = model.getState();

  model.setState({ ...currentState, typedProduct: { ...currentState.typedProduct, price } });

  renderProductPriceInput({ price });
};

export const typeProductQuantity = ({ quantity }) => {
  const currentState = model.getState();

  model.setState({ ...currentState, typedProduct: { ...currentState.typedProduct, quantity } });

  renderProductQuantityInput({ quantity });
};

export const addProduct = () => {
  const { products, typedProduct } = model.getState();

  const newProducts = [...products, typedProduct];

  model.setState({
    ...model.getState(),
    products: newProducts,
  });

  renderProductList({ products: newProducts });
  renderProductInputElements(DEFAULT_TYPED_PRODUCT);
};
