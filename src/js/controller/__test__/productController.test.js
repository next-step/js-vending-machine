import { testBody } from '../../../constants/testHtml.js';
import VendinMachineModel from '../../model/vendingMachineModel.js';
import ProductView from '../../view/productView.js';
import ProductController from '../productController.js';

describe('productController', () => {
  document.body.innerHTML = testBody;

  const MOCK = {
    PRODUCTS: [
      {
        name: '상품',
        price: 1000,
        quantity: 10,
      },
    ],
    ADDITIONAL_PRODUCT: {
      name: '추가상품',
      price: 1000,
      quantity: 10,
    },
    MODIFIED_PRODUCT: {
      name: '상품',
      price: 1200,
      quantity: 12,
    },
  };

  const productController = new ProductController({ model: new VendinMachineModel(), view: new ProductView() });
  it('다른 이름이 있는 경우 제품리스트에 하나가 추가 되어야한다.', () => {
    expect(
      productController.checkSameProduct({
        products: MOCK.PRODUCTS,
        typedProduct: MOCK.ADDITIONAL_PRODUCT,
      })
    ).toEqual([...MOCK.PRODUCTS, MOCK.ADDITIONAL_PRODUCT]);
  });

  it('같은 이름으로 제품이 추가 되는 경우 기존 리스트에서 상태값을 바꿔줘야한다.', () => {
    expect(
      productController.checkSameProduct({
        products: MOCK.PRODUCTS,
        typedProduct: MOCK.MODIFIED_PRODUCT,
      })
    ).toEqual([MOCK.MODIFIED_PRODUCT]);
  });
});
