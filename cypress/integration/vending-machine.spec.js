import { MESSAGE } from '../../js/product/const/index.js';
import createStore from '../../js/state/index.js';

before(() => {
  cy.visit('http://127.0.0.1:5500/index.html');
});

const getProductInfo = (name, price, quantity) => ({
  name: {
    $el: '#product-name-input',
    value: name,
  },
  price: {
    $el: '#product-price-input',
    value: price,
  },
  quantity: {
    $el: '#product-quantity-input',
    value: quantity,
  },
});

describe('Step1 - 상품 관리', () => {
  describe('입력값 유효성 검사', () => {
    beforeEach(() => {
      createStore({ products: [] });
    });

    it('금액의 단위가 10원이 아니라면 경고창을 출력한다.', () => {
      cy.addProductInfo(getProductInfo('콜라', 12, 10))
        .submitForm()
        .alert(MESSAGE.PLZ_CHECK_PRICE_UNIT);
    });

    it('상품의 이름, 가격, 수량 순으로 상품 목록이 보여진다', () => {
      const info = {
        name: '딸기라떼',
        price: 5_000,
        quantity: 40,
      };

      cy.addProductInfo(
        getProductInfo(info.name, info.price, info.quantity)
      ).submitForm();

      cy.get('#product-inventory-container')
        .children()
        .should(($trs) => {
          expect($trs.children().eq(0)).to.contain(info.name);
          expect($trs.children().eq(1)).to.contain(info.price);
          expect($trs.children().eq(2)).to.contain(info.quantity);
        });
    });

    it('동일한 상품명의 데이터를 추가하면 새로운 상품으로 대체된다.', () => {
      const lastItem = {
        name: '콜라',
        price: 500,
        quantity: 12,
      };

      cy.addProductInfo(getProductInfo('콜라', 2_000, 10))
        .submitForm()
        .addProductInfo(getProductInfo('사이다', 1_000, 5))
        .submitForm()
        .addProductInfo(getProductInfo('우유', 4_000, 2))
        .submitForm()
        .addProductInfo(
          getProductInfo(lastItem.name, lastItem.price, lastItem.quantity)
        )
        .submitForm();

      cy.get('#product-inventory-container')
        .children()
        .should(($trs) => {
          expect($trs).to.have.length(3);
          expect($trs.eq(2)).to.contain(lastItem.name);
          expect($trs.eq(2)).to.contain(lastItem.price);
          expect($trs.eq(2)).to.contain(lastItem.quantity);
        });
    });

    it('상품 목록은 탭을 이동하여도 기존의 상품 목록이 유지되어야 한다.', () => {
      cy.addProductInfo(getProductInfo('콜라', 2_000, 10))
        .submitForm()
        .addProductInfo(getProductInfo('사이다', 1_000, 5))
        .submitForm()
        .addProductInfo(getProductInfo('우유', 4_000, 2))
        .submitForm();

      cy.get('#vending-machine-manage-menu').click();
      cy.get('#product-manage-menu').click();

      cy.get('#product-inventory-container')
        .children()
        .should(($trs) => {
          expect($trs).to.have.length(3);
        });
    });
  });
});
