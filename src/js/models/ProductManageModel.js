class ProductManageModel {
  #product;

  constructor(product) {
    this.#product = product;
    this.#validate();
  }

  get product() {
    return this.#product;
  }

  #validate() {
    this.#validateEmpty();
    this.#validateQuantity();
    this.#validatePrice();
  }

  #validateEmpty() {
    if(!this.#product?.name){
      alert('상품명을 입력해주세요');
      throw Error('상품명을 입력해주세요');
    }
    if(!this.#product?.price){
      alert('금액을 입력해주세요');
      throw Error('금액을 입력해주세요');
    }
    if(!this.#product?.quantity){
      alert('수량을 입력해주세요');
      throw Error('수량을 입력해주세요');
    }
  }

  #validatePrice() {
    if(this.#product?.price < 100) {
      alert('상품의 최소 가격은 100원입니다.');
      throw Error('상품의 최소 가격은 100원입니다.');
    }
    if(this.#product?.price % 10 !== 0) {
      alert('상품의 가격은 10의 배수만 단위만 가능합니다.');
      throw Error('상품의 가격은 10의 배수만 단위만 가능합니다.');
    }
  }

  #validateQuantity() {
    if(this.#product?.quantity < 1) {
      alert('상품의 최소 수량은 1개 이상입니다.');
      throw Error('상품의 최소 수량은 1개 이상입니다.');
    }
  }
}
export default ProductManageModel;