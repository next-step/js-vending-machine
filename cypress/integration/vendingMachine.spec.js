import { VALIDATE } from '../../js/util/consts.js';
import '../util/util.js';

describe('vending machine', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('상품관리 화면', () => {
    const product = ['아메리카노', '4000', '4'];

    it('최초 상품 공백 확인', () => {
      cy.findProduct().should('not.be.visible');
    });

    it('상품명, 금액, 수량을 추가할 수 있다. 추가한 상품은 하위 UI에 반영된다.', () => {
      cy.addProduct(...product);
      product.forEach((value) => {
        cy.findProduct().find('td').should('contain.text', value);
      });
    });

    it('상품의 최소 가격은 100원이며, 10원으로 나누어 떨어져야 한다.', () => {
      const alert = cy.stub();
      const priceUnitErrorData = ['아메리카노', '13', '4'];
      cy.on('window:alert', alert);
      cy.addProduct(...priceUnitErrorData);
      cy.findAddButton()
        .click()
        .then((_) => {
          const message = alert.getCall(0).lastArg;
          expect(message).to.equal(VALIDATE.TEN_UNIT_PRICE);
        });
    });

    it('같은 상품명의 데이터를 추가하면 기존의 상품에 해당하는 데이터는 새로운 상품으로 대체된다.', () => {
      const overLapProduct = ['아메리카노', '3000', '5'];
      cy.addProduct(...product);
      cy.addProduct(...overLapProduct);
      overLapProduct.forEach((value) => {
        cy.findProduct().find('td').should('contain.text', value);
      });
    });

    it('상품 목록은 탭을 이동하여도 기존의 상품 목록이 유지되어야 한다.', () => {
      cy.get('product-inventory')
        .shadow()
        .find('[data-manage=product]')
        .should('not.be.visible');
    });
  });
});
