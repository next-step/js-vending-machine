import { DEFAULT_TYPED_PRODUCT, VENDING_MACHINE_INITIAL_STATE } from '../../constants/index.js';

class vendingMachineModel {
  state = VENDING_MACHINE_INITIAL_STATE;

  get state() {
    return this.state;
  }

  /**
   * @param {{ typedProduct: { name: string; price: null; quantity: null; }; products: never[]; charginValue: number; }} newState
   */
  setState = (newState) => {
    //*TODO: 여기에 에러 핸들링 필요함(두개 state, newState 키를 비교해서 다르면 에러 반환)

    this.state = { ...this.state, ...newState };
  };

  modifyHashId = ({ hashId }) => {
    this.setState({ hashId });
  };

  addCurrentName = ({ name }) => {
    this.setState({ typedProduct: { ...this.state.typedProduct, name } });
  };

  addCurrentPrice = ({ price }) => {
    this.setState({ typedProduct: { ...this.state.typedProduct, price } });
  };

  addCurrentQuantity = ({ quantity }) => {
    this.setState({ typedProduct: { ...this.state.typedProduct, quantity } });
  };

  clearTypedValue = () => {
    this.setState({ typedProduct: DEFAULT_TYPED_PRODUCT });
  };

  addProduct = (newProduct) => {
    this.setState({
      products: newProduct,
    });
  };

  addTypeCoins = (coinValue) => {
    this.setState({
      typedCoin: coinValue,
    });
  };

  addTotalCoin = (typedCoin) => {
    this.setState({
      chargedTotal: this.state.chargedTotal + typedCoin,
    });
  };
}

export default vendingMachineModel;
