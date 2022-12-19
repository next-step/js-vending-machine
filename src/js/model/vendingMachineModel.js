import { DEFAULT_TYPED_PRODUCT, STORAGE, VENDING_MACHINE_INITIAL_STATE } from '../../constants/index.js';
import storage from '../utils/storage.js';

class vendingMachineModel {
  state = storage.getStorage({ id: STORAGE.KEY }) || VENDING_MACHINE_INITIAL_STATE;

  get state() {
    return this.state;
  }

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

  setNewCoinMap = (newCoinMap) => {
    this.setState({
      coinMap: newCoinMap,
    });
  };
}

export default vendingMachineModel;
