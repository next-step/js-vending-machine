/*
// 잔돈 충전 탭에서, 다음과 같은 규칙으로 자판기 보유 금액을 충전한다.
// 잔돈 충전 페이지에서 최초 자판기가 보유한 금액은 0원이며, 각 동전의 개수는 0개이다.
// 관리자는 잔돈 충전 입력 요소에 충전할 금액을 입력한 후, 자판기 동전 충전 버튼을 눌러 자판기가 보유한 금액을 충전할 수 있다.
// 최소 충전 금액은 100원이며, 10원으로 나누어 떨어지는 금액만 충전이 가능하다.
// 자판기가 보유한 금액은 {금액}원 형식으로 나타낸다. (이미지)
// 예) 1000원 (o) / 1000 원 (x) / 1000 (x)
// 관리자는 잔돈을 누적하여 충전할 수 있다.
// 1000원 충전 -> 500원 충전 => 총 1500원 분량의 동전이 생성됨. (추가)
// 자판기가 보유한 금액 만큼의 동전이 무작위로 생성된다.
동전은 500원, 100원, 50원, 10원의 동전만 생성된다.
동전의 개수를 나타내는 정보는 {개수}개 형식으로 나타낸다.
예) 1개 (o) / 1 개 (x) / 1 (x)
다른 탭을 클릭하여도 자판기가 보유한 금액은 유지되어야 한다.
 */
import {
  getInitialChanges,
  setChanges
} from "../../../src/js/components/storage";

describe('동전은 500원, 100원, 50원, 10원의 동전만 생성된다.', () => {
  before(() => {
    cy.visit('index.html');
    cy.get('#vending-machine-manage-menu').click();
  });

  beforeEach(() => {
    setChanges(getInitialChanges());
    cy.get('#vending-machine-manage-menu').click();
  });

  it('입력된 금액과 잔돈의 총합은 같다', () => {
    const money = '10000'
    cy.get('#vending-machine-charge-input').type(money);
    cy.get('#vending-machine-charge-button').click();
    cy.wait(2000);
    cy.get('#VendingMachineManagement .coin-amount').should($eles => {
      console.log(500, $eles[0].innerHTML);
      console.log(100, $eles[1].innerHTML);
      console.log(50, $eles[2].innerHTML);
      console.log(10, $eles[3].innerHTML);
      const total =
        (500 * Number.parseInt($eles[0].innerHTML)) + (100 + Number.parseInt($eles[1].innerHTML))
        + (50 * Number.parseInt($eles[2].innerHTML)) + (10 * Number.parseInt($eles[3].innerHTML));
      expect(total).to.be.equal(Number.parseInt(money));
    });
  });
});