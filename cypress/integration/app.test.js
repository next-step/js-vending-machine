import { APP_KEY } from '../../src/constants.js';

const BASE_URL = '../../index.html';

describe('Vending Machine', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
    cy.initLocalStorage();
  });

  describe('각 탭에 최초 접속 시', () => {
    it('로컬 스토리지는 초깃값으로 존재해야 한다.', () => {
      expect(localStorage.getItem(APP_KEY)).to.be.equal('{"PRODUCT":[],"CHARGE":{"10":0,"50":0,"100":0,"500":0}}');
    });
    it('상품 관리 탭 : 최초 상품 목록은 비워진 상태이다.', () => {
      cy.$('#product-manage-menu')
        .click()
        .then(() => {
          expect(cy.$('tbody').children().should('have.length', 0));
        });
    });
    it('잔돈 충전 탭 : 최초 자판기 보유 금액은 0원, 각 동전의 개수는 0개이다.', () => {
      cy.$('#vending-machine-manage-menu')
        .click()
        .then(() => {
          expect(cy.$('[data-charge-coin="500"]').should('have.text', 0));
          expect(cy.$('[data-charge-coin="100"]').should('have.text', 0));
          expect(cy.$('[data-charge-coin="50"]').should('have.text', 0));
          expect(cy.$('[data-charge-coin="10"]').should('have.text', 0));
        });
    });
    it('상품 구매 탭 : 최초 충전 금액은 0원, 반환된 각 동전의 개수는 0개이다.', () => {
      cy.$('#product-purchase-menu')
        .click()
        .then(() => {
          expect(cy.$('#purchase-charged-money').should('have.text', 0));

          expect(cy.$('[data-return-coin="500"]').should('have.text', 0));
          expect(cy.$('[data-return-coin="100"]').should('have.text', 0));
          expect(cy.$('[data-return-coin="50"]').should('have.text', 0));
          expect(cy.$('[data-return-coin="10"]').should('have.text', 0));
        });
    });
  });

  describe('상품 관리 탭에서 상품을 추가하는 경우', () => {
    describe('입력값 유효성 검사 실패 시 input이 invalid 된다.', () => {
      it(`공백은 허용되지 않는다.`, () => {
        cy.inputProduct({ name: '', price: '', quantity: '' }).then(() => {
          cy.checkValidForm('.product-add-form', 3);
        });
      });
      it(`금액은 100원 미만으로 입력될 수 없다.`, () => {
        cy.inputProduct({ name: '콜라', price: 99, quantity: 2 }).then(() => {
          cy.checkValidForm('.product-add-form', 1);
        });
      });
      it(`금액의 단위는 10원이어야 한다.`, () => {
        cy.inputProduct({ name: '콜라', price: 109, quantity: 2 }).then(() => {
          cy.checkValidForm('.product-add-form', 1);
        });
      });
      it(`수량은 1 미만으로 입력될 수 없다.`, () => {
        cy.inputProduct({ name: '콜라', price: 100, quantity: -1 }).then(() => {
          cy.checkValidForm('.product-add-form', 1);
        });
      });
      it(`수량의 단위는 1이어야 한다.`, () => {
        cy.inputProduct({ name: '콜라', price: 100, quantity: 1.1 }).then(() => {
          cy.checkValidForm('.product-add-form', 1);
        });
      });
    });

    describe('입력값 유효성 검사에 성공하는 경우', () => {
      it(`상품 테이블에 상품 정보가 추가된다.`, () => {
        const product = { name: '콜라', price: 1500, quantity: 10 };
        cy.inputProduct(product);

        cy.$('.product-add-form')
          .submit()
          .then(() => {
            cy.$('tbody tr:first-child')
              .find('td')
              .eq(0)
              .should('have.text', product.name)
              .next()
              .should('have.text', product.price)
              .next()
              .should('have.text', product.quantity);
          });
      });
      it(`같은 상품명이 입력되면 새로운 정보로 대체(Replace)된다.`, () => {
        cy.inputProduct({ name: '콜라', price: 1500, quantity: 5 });
        cy.$('.product-add-form').submit();

        cy.inputProduct({ name: '사이다', price: 2500, quantity: 10 });
        cy.$('.product-add-form').submit();

        cy.inputProduct({ name: '콜라', price: 3500, quantity: 12 });
        cy.$('.product-add-form')
          .submit()
          .then(() => {
            cy.$('tbody tr:first-child')
              .find('td')
              .eq(0)
              .should('have.text', '콜라')
              .next()
              .should('have.text', 3500)
              .next()
              .should('have.text', 12);
          });
      });
    });
  });

  describe('잔돈 충전 탭에서 잔돈을 충전하는 경우', () => {
    describe('입력값 유효성 검사 실패 시 경고창을 출력한다.', () => {
      it(`공백은 허용되지 않는다.`, () => {});
      it(`금액은 100원 미만으로 입력될 수 없다.`, () => {});
      it(`금액의 단위는 10원이어야 한다.`, () => {});
    });

    describe('입력값 유효성 검사에 성공하는 경우', () => {
      it(`보유 금액은 추가된 금액만큼 누적(Update)된다.`, () => {});
      it(`금액만큼 잔돈을 충전할 때 동전은 무작위로 선별되어 500원, 100원, 50원, 10원 단위로 생성된다.`, () => {});
      it(`생성된 동전의 개수는 누적(Update)된다.`, () => {});
    });
  });

  describe('상품 구매 탭에서 구매 금액을 충전하는 경우', () => {
    describe('입력값 유효성 검사 실패 시 경고창을 출력한다.', () => {
      it(`공백은 허용되지 않는다.`, () => {});
      it(`금액은 10원 미만으로 입력될 수 없다.`, () => {});
      it(`금액의 단위는 10원이어야 한다.`, () => {});
    });

    describe('입력값 유효성 검사에 성공하는 경우', () => {
      it(`충전 금액은 추가된 금액만큼 누적(Update)된다.`, () => {});
    });
  });

  describe('상품 구매 탭에서 충전한 금액만큼 상품 구매를 하는 경우', () => {
    it(`금액보다 비싼 상품을 구매하려는 경우 경고창이 출력된다.`, () => {});
    it(`상품 구매에 성공하면 충전 금액에서 상품 금액만큼 차감된다. 또한 상품 수량도 차감된다.`, () => {});
    it(`수량이 0인 상품을 구매하려는 경우 경고창이 출력된다.`, () => {});
  });

  describe('상품 구매 탭에서 남은 금액을 반환하는 경우', () => {
    /**
     * 예) 자판기가 보유한 동전 100원 5개, 500원 1개인 상태이고, 500원을 거슬러줘야 한다면 500원 1개를 반환한다.
     * 예) 자판기가 보유한 동전 100원 5개, 500원 2개인 상태이고, 1000원을 거슬러줘야 한다면 500원 2개를 반환한다.
     * 예) 자판기가 보유한 동전 100원 6개, 500원 1개인 상태이고, 1000원을 거슬러줘야 한다면 100원 5개 500원 1개를 반환한다.
     */
    it(`최소 개수의 동전으로 잔돈이 반환된다.`, () => {});
    it(`잔돈 반환 시 보유한 동전 개수를 차감(Replace)한다.`, () => {});
    it(`모든 금액을 잔돈으로 반환할 수 없는 경우 남은 금액은 자판기가 꿀꺽한다.`, () => {});
    it(`반환된 동전 결과는 누적되지 않고 갱신된다.`, () => {});
  });
});
