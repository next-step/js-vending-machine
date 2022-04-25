before(() => {
  cy.visit('../../dist/index.html');
});

const $formContainer = () => cy.get('[data-test="product-container"]');
const $nameInput = () => cy.get('[data-test="product-name-input"]');
const $priceInput = () => cy.get('[data-test="product-price-input"]');
const $quantityInput = () => cy.get('[data-test="product-quantity-input"]');

const $inventroyContainer = () =>
  cy.get('[data-test="product-inventory-container"');

beforeEach(() => {
  cy.reload();
  cy.visit('../../dist/index.html');
});

const powerAde = ['파워에이드', '1500', '3'];
const powerAdeAfter = ['파워에이드', '1200', '2'];
const gaetoray = ['게토레이', '1400', '2'];

const appendProduct = (item) => {
  const [name, price, quantity] = item;

  $nameInput().type(name);
  $priceInput().type(price);
  $quantityInput().type(quantity);

  $formContainer().submit();
};

const checkProducts = (items) => {
  $inventroyContainer()
    .find('td')
    .each(($el, idx) => expect($el.text()).eq(items[idx]));
};

describe('상품을 추가하려 한다.', () => {
  context('음료수 하나를 추가했다.', () => {
    it('파워에이드가 1500원으로 3개가 추가된다.', () => {
      appendProduct(powerAde);

      checkProducts(powerAde);
    });
  });

  context('음료수 두개를 추가했다.', () => {
    it('파워에이드가 1500원으로 3개, 게토리이가 1400원으로 2개 추가된다.', () => {
      appendProduct(powerAde);
      appendProduct(gaetoray);

      const allProducts = [...powerAde, ...gaetoray];

      checkProducts(allProducts);
    });
  });
});

describe('상품을 변경하려 한다.', () => {
  context('음료수 하나를 변경했다.', () => {
    it('추가되어 있던 파워에이드가 2개, 1200원으로 변경된다.', () => {
      appendProduct(powerAde);
      appendProduct(powerAdeAfter);

      checkProducts(powerAdeAfter);
    });
  });
});
