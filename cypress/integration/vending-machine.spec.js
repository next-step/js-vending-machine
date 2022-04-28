Cypress.Commands.add('$productManageMenu', () =>
  cy.get('#product-manage-menu')
);
Cypress.Commands.add('$vendingMachineManageMenu', () =>
  cy.get('#vending-machine-manage-menu')
);
Cypress.Commands.add('$productPurchaseMenu', () =>
  cy.get('#product-purchase-menu')
);
Cypress.Commands.add('$app', () => cy.get('#app'));
Cypress.Commands.add('$productContainer', () =>
  cy.$app().get('div.product-container')
);
Cypress.Commands.add('$productInventory', () =>
  cy.$app().get('table.product-inventory')
);
Cypress.Commands.add('$productList', () =>
  cy.$app().get('#product-inventory-container > tr')
);
Cypress.Commands.add('$productNameInput', () =>
  cy.$app().get('#product-name-input')
);
Cypress.Commands.add('$productPriceInput', () =>
  cy.$app().get('#product-price-input')
);
Cypress.Commands.add('$productQuantityInput', () =>
  cy.$app().get('#product-quantity-input')
);
Cypress.Commands.add('$productAddSubmit', () =>
  cy.$app().get('#product-add-button')
);
Cypress.Commands.add('findProduct', ({ name, price, quantity }) =>
  cy
    .$productList()
    .filter(
      `[data-name=${name}][data-price=${price}][data-quantity=${quantity}]`
    )
);
Cypress.Commands.add('clearProductFields', () => {
  cy.$productNameInput().clear();
  cy.$productPriceInput().clear();
  cy.$productQuantityInput().clear();
});
Cypress.Commands.add('$vendingMachineWrapper', () =>
  cy.$app().get('div.vending-machine-wrapper')
);
Cypress.Commands.add('$vendingMachineChargeInput', () =>
  cy.$app().get('#vending-machine-charge-input')
);
Cypress.Commands.add('$vendingMachineChargeSubmit', () =>
  cy.$app().get('#vending-machine-charge-button')
);
Cypress.Commands.add('$vendingMachineChargeCoinList', () =>
  cy.$app().get('td[id^=vending-machine-coin-][id$=-quantity]')
);
Cypress.Commands.add('$vendingMachineChargeAmount', () =>
  cy.$app().get('#vending-machine-charge-amount')
);
Cypress.Commands.add('$productPurchaseAmountChargeInput', () =>
  cy.$app().get('#charge-input')
);
Cypress.Commands.add('$productPurchaseAmountChargeSubmit', () =>
  cy.$app().get('#charge-button')
);
Cypress.Commands.add('$productPurchaseChargeAmount', () =>
  cy.$app().get('#charge-amount')
);

describe('자판기', () => {
  beforeEach(() => {
    cy.visit('../../index.html');
  });

  describe('메인 화면 테스트', () => {
    it('상품관리, 잔동충전, 상품구매 버튼이 보인다.', () => {
      cy.$productManageMenu().should('be.visible');
      cy.$vendingMachineManageMenu().should('be.visible');
      cy.$productPurchaseMenu().should('be.visible');
    });
  });

  describe('상품관리 화면 테스트', () => {
    beforeEach(() => {
      cy.$productManageMenu().click();
    });

    it('상품명, 가격, 수량을 입력할 수 있는 폼이 보인다.', () => {
      cy.$productContainer().should('be.visible');
      cy.$productNameInput().should('be.visible');
      cy.$productPriceInput().should('be.visible');
      cy.$productQuantityInput().should('be.visible');
      cy.$productAddSubmit().should('be.visible');
    });

    it('비어있는 상품 목록이 보인다.', () => {
      cy.$productInventory().should('be.visible');
      cy.$productList().should('not.exist');
    });

    describe('상품 입력 테스트', () => {
      it('상품명은 어떤 값이든 입력이 가능하다.', () => {
        cy.$productNameInput().type('상품명테스트1');
        cy.$productNameInput().should('have.value', '상품명테스트1');
      });

      it('가격은 숫자만 입력이 가능하다.', () => {
        cy.$productPriceInput().type('가격테스트');
        cy.$productPriceInput().should('have.value', '');
        cy.$productPriceInput().type('aafa ');
        cy.$productPriceInput().should('have.value', '');
        cy.$productPriceInput().type(12);
        cy.$productPriceInput().should('have.value', 12);
      });

      it('수량은 숫자만 입력이 가능하다.', () => {
        cy.$productQuantityInput().type('수량테스트');
        cy.$productQuantityInput().should('have.value', '');
        cy.$productQuantityInput().type('aafa ');
        cy.$productQuantityInput().should('have.value', '');
        cy.$productQuantityInput().type(10);
        cy.$productQuantityInput().should('have.value', 10);
      });
    });

    describe('상품 추가 테스트', () => {
      it('상품명을 입력하지 않고 추가하기를 눌렀을때 상품은 추가되지 않는다.', () => {
        cy.$productAddSubmit()
          .click()
          .then(() => {
            cy.$productNameInput()
              .invoke('prop', 'validity')
              .should('deep.include', {
                valueMissing: true,
                valid: false,
              });
          });
      });

      it('상품가격을 입력하지 않고 추가하기를 눌렀을때 상품은 추가되지 않는다.', () => {
        cy.$productNameInput().type('상품명테스트');
        cy.$productAddSubmit()
          .click()
          .then(() => {
            cy.$productPriceInput()
              .invoke('prop', 'validity')
              .should('deep.include', {
                valueMissing: true,
                valid: false,
              });
          });
      });

      it('상품수량을 입력하지 않고 추가하기를 눌렀을때 상품은 추가되지 않는다.', () => {
        cy.$productNameInput().type('상품명테스트');
        cy.$productPriceInput().type(1000);
        cy.$productAddSubmit()
          .click()
          .then(() => {
            cy.$productQuantityInput()
              .invoke('prop', 'validity')
              .should('deep.include', {
                valueMissing: true,
                valid: false,
              });
          });
      });

      it('상품가격을 최소가격(100)과 최소수량(1)을 도달하지 못한 경우 상품이 추가되지 않는다.', () => {
        cy.$productNameInput().type('경계값테스트');
        cy.$productPriceInput().type(99);
        cy.$productQuantityInput().type(0);
        cy.$productAddSubmit()
          .click()
          .then(() => {
            cy.$productPriceInput()
              .invoke('prop', 'validity')
              .should('deep.include', {
                stepMismatch: true,
                rangeUnderflow: true,
                valid: false,
              });
            cy.$productQuantityInput()
              .invoke('prop', 'validity')
              .should('deep.include', {
                rangeUnderflow: true,
                valid: false,
              });
          });
      });

      it('상품가격을 10단위로 입력하지 않은채(122) 추가하는경우 추가되지 않는다.', () => {
        cy.$productNameInput().type('상품명 테스트');
        cy.$productPriceInput().type(122);
        cy.$productQuantityInput().type(10);
        cy.$productAddSubmit()
          .click()
          .then(() => {
            cy.$productPriceInput()
              .invoke('prop', 'validity')
              .should('deep.include', {
                stepMismatch: true,
                valid: false,
              });
          });
      });

      it('상품명을 공백은 입력되지 않는다..', () => {
        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);

        cy.$productNameInput().type(' ');
        cy.$productPriceInput().type(1000);
        cy.$productQuantityInput().type(10);
        cy.$productAddSubmit()
          .click()
          .then(() => {
            cy.$productNameInput()
              .invoke('prop', 'validity')
              .should('deep.include', {
                valueMissing: true,
                valid: false,
              });
          });
      });

      it('올바르게 상품(경계값)을 입력한 경우 상품 목록에 입력한 내용의 상품이 추가된다.', () => {
        const name = '경계값상품';
        const price = 100;
        const quantity = 1;
        cy.$productNameInput().type(name);
        cy.$productPriceInput().type(price);
        cy.$productQuantityInput().type(quantity);
        cy.$productAddSubmit()
          .click()
          .then(() => {
            cy.findProduct({ name, price, quantity }).should('be.exist');
          });
      });

      it('올바르게 상품을 입력한 경우 상품 목록에 입력한 내용의 상품이 추가된다.', () => {
        const name = '제대로된상품';
        const price = 1000;
        const quantity = 10;
        cy.$productNameInput().type(name);
        cy.$productPriceInput().type(price);
        cy.$productQuantityInput().type(quantity);
        cy.$productAddSubmit()
          .click()
          .then(() => {
            cy.findProduct({ name, price, quantity }).should('be.exist');
          });
      });

      it('상품을 연속적으로 추가가 가능하다.', () => {
        const name1 = '상품1';
        const price1 = 1000;
        const quantity1 = 10;
        const name2 = '상품2';
        const price2 = 1000;
        const quantity2 = 10;
        cy.$productNameInput().type(name1);
        cy.$productPriceInput().type(price1);
        cy.$productQuantityInput().type(quantity1);
        cy.$productAddSubmit()
          .click()
          .then(() => {
            cy.findProduct({
              name: name1,
              price: price1,
              quantity: quantity1,
            }).should('be.exist');
          });
        cy.$productNameInput().type(name2);
        cy.$productPriceInput().type(price2);
        cy.$productQuantityInput().type(quantity2);
        cy.$productAddSubmit()
          .click()
          .then(() => {
            cy.findProduct({
              name: name2,
              price: price2,
              quantity: quantity2,
            }).should('be.exist');
          });
      });

      it('같은 상품명을 연속적으로 추가하는 경우 기존 상품이 대체된다.', () => {
        const name1 = '상품1';
        const price1 = 1000;
        const quantity1 = 10;
        const name2 = '상품2';
        const price2 = 1000;
        const quantity2 = 10;
        cy.$productNameInput().type(name1);
        cy.$productPriceInput().type(price1);
        cy.$productQuantityInput().type(quantity1);
        cy.$productAddSubmit()
          .click()
          .then(() => {
            cy.findProduct({
              name: name1,
              price: price1,
              quantity: quantity1,
            }).should('be.exist');
          });
        cy.$productNameInput().type(name2);
        cy.$productPriceInput().type(price2);
        cy.$productQuantityInput().type(quantity2);
        cy.$productAddSubmit()
          .click()
          .then(() => {
            cy.findProduct({
              name: name2,
              price: price2,
              quantity: quantity2,
            }).should('be.exist');
          });
        cy.$productNameInput().type(name1);
        cy.$productPriceInput().type(price1 + 1000);
        cy.$productQuantityInput().type(quantity1 + 10);
        cy.$productAddSubmit()
          .click()
          .then(() => {
            cy.findProduct({
              name: name1,
              price: price1 + 1000,
              quantity: quantity1 + 10,
            }).should('be.exist');
            cy.$productList().should('have.length', 2);
          });
      });
    });
  });

  describe('잔돈충전 화면 테스트', () => {
    beforeEach(() => {
      cy.$vendingMachineManageMenu().click();
    });

    it('동전을 입력할 수 있는 폼이 보인다.', () => {
      cy.$vendingMachineWrapper().should('be.visible');
      cy.$vendingMachineChargeInput().should('be.visible');
      cy.$vendingMachineChargeSubmit().should('be.visible');
    });

    it('보유 금액과 보유 현황이 보인다.', () => {
      cy.$vendingMachineChargeAmount().should('be.visible');
      cy.$vendingMachineChargeCoinList().should('be.exist');
      cy.$vendingMachineChargeCoinList().should('have.length', 4);
    });

    describe('충전 금액 입력 테스트', () => {
      it('충전 금액은 숫자만 입력이 가능하다.', () => {
        cy.$vendingMachineChargeInput().type('충전테스트');
        cy.$vendingMachineChargeInput().should('have.value', '');
        cy.$vendingMachineChargeInput().type('aafa ');
        cy.$vendingMachineChargeInput().should('have.value', '');
        cy.$vendingMachineChargeInput().type(12);
        cy.$vendingMachineChargeInput().should('have.value', 12);
      });
    });

    describe('충전 테스트', () => {
      it('충전금액을 입력하지 않고 충전하기를 눌렀을때 보유 금액이 변경되지 않는다.', () => {
        cy.$vendingMachineChargeSubmit()
          .click()
          .then(() => {
            cy.$vendingMachineChargeInput()
              .invoke('prop', 'validity')
              .should('deep.include', {
                valueMissing: true,
                valid: false,
              });
          });
      });

      it('충전 금액은 최소값 100을 넘겨야된다.(99)', () => {
        cy.$vendingMachineChargeInput().type(99);
        cy.$vendingMachineChargeSubmit()
          .click()
          .then(() => {
            cy.$vendingMachineChargeInput()
              .invoke('prop', 'validity')
              .should('deep.include', {
                rangeUnderflow: true,
                valid: false,
              });
          });
      });

      it('충전 금액은 10 단위여야한다.(121)', () => {
        cy.$vendingMachineChargeInput().type(121);
        cy.$vendingMachineChargeSubmit()
          .click()
          .then(() => {
            cy.$vendingMachineChargeInput()
              .invoke('prop', 'validity')
              .should('deep.include', {
                stepMismatch: true,
                valid: false,
              });
          });
      });

      it('충전금액을 입력하고 충전하기를 누르면 보유 금액이 입력된 만큼 변경된다.', () => {
        cy.$vendingMachineChargeInput().type(120);
        cy.$vendingMachineChargeSubmit()
          .click()
          .then(() => {
            cy.$vendingMachineChargeAmount().should('have.text', 120);
          });
      });

      it('충전금액을 입력하고 충전하기를 누른후 다시 충전하면 기존 충전한 금액과 합산된다.', () => {
        cy.$vendingMachineChargeInput().type(120);
        cy.$vendingMachineChargeSubmit()
          .click()
          .then(() => {
            cy.$vendingMachineChargeAmount().should('have.text', 120);
            cy.$vendingMachineChargeInput().type(1000);
            cy.$vendingMachineChargeSubmit()
              .click()
              .then(() => {
                cy.$vendingMachineChargeAmount().should('have.text', 1120);
              });
          });
      });

      it('보유금액이 변경된 경우 동전 보유 현황이 갱신된다.', () => {
        cy.$vendingMachineChargeInput().type(120);
        cy.$vendingMachineChargeSubmit()
          .click()
          .then(() => {
            cy.$vendingMachineChargeAmount().should('have.text', 120);
            let amount = 0;
            cy.$vendingMachineChargeCoinList()
              .each(($chargeCoin) => {
                const name = $chargeCoin.data('testName');
                const quantity = $chargeCoin.data('testQuantity');
                amount += quantity * name;
              })
              .then(() => {
                expect(amount).eq(120);
              });
            cy.$vendingMachineChargeInput().type(1000);
            cy.$vendingMachineChargeSubmit()
              .click()
              .then(() => {
                cy.$vendingMachineChargeAmount().should('have.text', 1120);
                let amount = 0;
                cy.$vendingMachineChargeCoinList()
                  .each(($chargeCoin) => {
                    const name = $chargeCoin.data('testName');
                    const quantity = $chargeCoin.data('testQuantity');
                    amount += quantity * name;
                  })
                  .then(() => {
                    expect(amount).eq(1120);
                  });
              });
          });
      });
    });
  });

  describe('상품구매 화면 테스트', () => {
    beforeEach(() => {
      cy.$productPurchaseMenu().click();
    });

    it('동전을 입력할 수 있는 폼이 보인다.', () => {
      cy.$productPurchaseAmountChargeInput().should('be.visible');
      cy.$productPurchaseAmountChargeSubmit().should('be.visible');
    });

    it('보유 금액이 보인다.', () => {
      cy.$productPurchaseChargeAmount().should('be.visible');
    });

    describe('충전 금액 입력 테스트', () => {
      it('충전 금액은 숫자만 입력이 가능하다.', () => {
        cy.$productPurchaseAmountChargeInput().type('충전테스트');
        cy.$productPurchaseAmountChargeInput().should('have.value', '');
        cy.$productPurchaseAmountChargeInput().type('aafa ');
        cy.$productPurchaseAmountChargeInput().should('have.value', '');
        cy.$productPurchaseAmountChargeInput().type(12);
        cy.$productPurchaseAmountChargeInput().should('have.value', 12);
      });
    });

    describe('충전 테스트', () => {
      it('충전금액을 입력하지 않고 충전하기를 눌렀을때 보유 금액이 변경되지 않는다.', () => {
        cy.$productPurchaseAmountChargeSubmit()
          .click()
          .then(() => {
            cy.$productPurchaseAmountChargeInput()
              .invoke('prop', 'validity')
              .should('deep.include', {
                valueMissing: true,
                valid: false,
              });
            cy.$productPurchaseChargeAmount().should('have.text', '0');
          });
      });
    });
  });
});
