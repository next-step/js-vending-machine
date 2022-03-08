import {
  getInitialChanges,
  setChanges
} from "../../../src/js/components/storage";

describe('잔돈 충전 / 요구사항', () => {
  before(() => {
    cy.visit('index.html');
    cy.get('#vending-machine-manage-menu').click();
  });

  describe('페이지에서 최초 자판기가 보유한 금액은 0원이며, 각 동전의 개수는 0개이다.', () => {
    it('페이지에서 최초 자판기가 보유한 금액은 0원', () => {
      cy.get('#vending-machine-charge-amount').should($eles => {
        expect($eles[0].innerHTML).to.equal('0');
      })
    });
    it('각 동전의 개수는 0개', () => {
      cy.get('#VendingMachineManagement .coin-amount').should($eles => {
        [].forEach.call($eles, $ele => {
          expect($ele.innerHTML).to.equal('0');
        });
      })
    });
  });

  describe('관리자는 잔돈 충전 입력 요소에 충전할 금액을 입력한 후, 자판기 동전 충전 버튼을 눌러 자판기가 보유한 금액을 충전할 수 있다.', () => {
    it('최소 충전 금액은 100원이며, 10원으로 나누어 떨어지는 금액만 충전이 가능하다.', () => {
      cy.get('#vending-machine-charge-input').type('10');
      cy.get('#vending-machine-charge-button').click();
      cy.get('#VendingMachineManagement .coin-amount').should($eles => {
        [].forEach.call($eles, $ele => {
          expect($ele.innerHTML).to.equal('0');
        });
      })

      cy.get('#vending-machine-charge-input').type('101');
      cy.get('#vending-machine-charge-button').click();
      cy.get('#VendingMachineManagement .coin-amount').should($eles => {
        [].forEach.call($eles, $ele => {
          expect($ele.innerHTML).to.equal('0');
        });
      })

      cy.get('#vending-machine-charge-input').type('110');
      cy.get('#vending-machine-charge-button').click();
      cy.get('#VendingMachineManagement .coin-amount').should($eles => {
        let hasValue = false;
        [].forEach.call($eles, $ele => {
          if($ele.innerHTML !== '0') {
            hasValue = true;
          }
        });
        expect(hasValue).to.be.true;
      })
    });
  });

  it('자판기가 보유한 금액은 {금액}원 형식으로 나타낸다.', () => {
    cy.get('#vending-machine-charge-amount-container').should($eles => {
      expect($eles[0].innerText.match(/^보유 금액: [0-9]+원$/)).not.empty;
    });
  });

  it('동전의 개수를 나타내는 정보는 {개수}개 형식으로 나타낸다.', () => {
    cy.get('#vending-machine-coin-500-quantity').should($eles => {
      expect($eles[0].innerText.match(/^[0-9]+개$/)).not.empty;
    });
    cy.get('#vending-machine-coin-100-quantity').should($eles => {
      expect($eles[0].innerText.match(/^[0-9]+개$/)).not.empty;
    });
    cy.get('#vending-machine-coin-50-quantity').should($eles => {
      expect($eles[0].innerText.match(/^[0-9]+개$/)).not.empty;
    });
    cy.get('#vending-machine-coin-10-quantity').should($eles => {
      expect($eles[0].innerText.match(/^[0-9]+개$/)).not.empty;
    });
  });

  describe('관리자는 잔돈을 누적하여 충전할 수 있다.', () => {
    before(() => {
      setChanges(getInitialChanges());
      cy.get('#vending-machine-manage-menu').click();
    });
    let totalCoinAmounts = 0;

    it('현재 입력된 코인이 하나도 없는지 확인', () => {
      cy.get('#VendingMachineManagement .coin-amount').should($eles => {
        [].forEach.call($eles, $ele => {
          totalCoinAmounts += Number.parseInt($ele.innerHTML);
        });
      });
      expect(totalCoinAmounts).to.be.equal(0);
    });

    it('입력 후 값이 증가했는지 확인', () => {
      cy.get('#vending-machine-charge-input').type('1000');
      cy.get('#vending-machine-charge-button').click();

      cy.get('#VendingMachineManagement .coin-amount').should($eles => {
        [].forEach.call($eles, $ele => {
          totalCoinAmounts += Number.parseInt($ele.innerHTML);
        });
        expect(totalCoinAmounts).gt(0);
      });
    });

    it('입력 후 값이 증가했는지 확인', () => {
      const tempTotalCoinAmounts = totalCoinAmounts;
      cy.get('#vending-machine-charge-input').type('1000');
      cy.get('#vending-machine-charge-button').click();

      cy.get('#VendingMachineManagement .coin-amount').should($eles => {
        [].forEach.call($eles, $ele => {
          totalCoinAmounts += Number.parseInt($ele.innerHTML);
        });
        expect(totalCoinAmounts).gt(tempTotalCoinAmounts);
      });
    });
  });

  describe('자판기가 보유한 금액 만큼의 동전이 무작위로 생성된다.', () => {
    before(() => {
      setChanges(getInitialChanges());
      cy.get('#vending-machine-manage-menu').click();
    });

    let count500, count100, count50, count10;
    it('최초 생성', () => {
      cy.get('#vending-machine-charge-input').type('100000');
      cy.get('#vending-machine-charge-button').click();

      cy.get('#VendingMachineManagement .coin-amount').should($eles => {
        count500 = $eles[0].innerHTML;
        count100 = $eles[1].innerHTML;
        count50 = $eles[2].innerHTML;
        count10 = $eles[3].innerHTML;
      });
    });

    it('바뀌었는지 확인', () => {
      cy.get('#vending-machine-charge-input').type('10000');
      cy.get('#vending-machine-charge-button').click();

      cy.get('#VendingMachineManagement .coin-amount').should($eles => {
        console.log(count500, $eles[0].innerHTML);
        console.log(count100, $eles[1].innerHTML);
        console.log(count50, $eles[2].innerHTML);
        console.log(count10, $eles[3].innerHTML);

        expect(count500 !== $eles[0].innerHTML
          || count100 !== $eles[1].innerHTML
          || count50 !== $eles[2].innerHTML
          || count10 !== $eles[3].innerHTML).to.be.true;
      });
      cy.saveLocalStorage();
    });

    it('다른 탭을 클릭하여도 자판기가 보유한 금액은 유지되어야 한다.', () => {
      cy.get('#vending-machine-charge-input').type('10000');
      cy.get('#vending-machine-charge-button').click();

      cy.get('#product-manage-menu').click();
      cy.get('#product-purchase-menu').click();
      cy.get('#vending-machine-manage-menu').click();
      cy.get('#VendingMachineManagement .coin-amount').should($eles => {
        let hasValue = false;
        [].forEach.call($eles, $ele => {
          if($ele.innerHTML !== '0') {
            hasValue = true;
          }
        });
        expect(hasValue).to.be.true;
      });
    });
  });

});