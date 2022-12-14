import { INITIAL_STATE } from '../../constants/index.js';

class ProductModel {
  state = INITIAL_STATE;

  get state() {
    return this.state;
  }

  /**
   * @param {{ typedProduct: { name: string; price: null; quantity: null; }; products: never[]; charginValue: number; }} newState
   */
  setState(newState) {
    //*TODO: 여기에 에러 핸들링 필요함(두개 state, newState 키를 비교해서 다르면 에러 반환)
    this.state = newState;
  }
}

export default ProductModel;
