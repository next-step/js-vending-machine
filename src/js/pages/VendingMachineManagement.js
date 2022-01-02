import Component from "../lib/Component.js";
import {$, getRandomIntInclusive} from "../components/utils.js";
import {getChanges, getInitialChanges, setChanges} from "../components/storage.js";


export default class VendingMachineManagement extends Component {
  setup() {
    this.charge = this.charge.bind(this);
  }

  template() {
    const {menu} = this.props;
    const changes = getChanges();
    return `
      <article class="sub-menu VendingMachineManagement" style="display: ${menu === 'VendingMachineManagement' ? 'block' : 'none'}">
        <h3>자판기 돈통 충전하기</h3>
        <div className="vending-machine-wrapper">
          <input type="number" name="vending-machine-charge-amount"
                 id="vending-machine-charge-input" autoFocus/>
          <button id="vending-machine-charge-button">충전하기</button>
        </div>
        <p id="vending-machine-charge-amount-container">보유 금액: <span id="vending-machine-charge-amount">0</span>원</p>
        <h3>동전 보유 현황</h3>
        <table className="cashbox-remaining">
          <colgroup>
            <col/>
            <col/>
          </colgroup>
          <thead>
          <tr>
            <th>동전</th>
            <th>개수</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>500원</td>
            <td id="vending-machine-coin-500-quantity">
                <span class="coin-amount">${changes.find(change => change.won === 500) ? changes.find(change => change.won === 500).amount : 0}</span>개
            </td>
          </tr>
          <tr>
            <td>100원</td>
            <td id="vending-machine-coin-100-quantity">
                <span class="coin-amount">${changes.find(change => change.won === 100) ? changes.find(change => change.won === 100).amount : 0}</span>개
            </td>
          </tr>
          <tr>
            <td>50원</td>
            <td id="vending-machine-coin-50-quantity">
                <span class="coin-amount">${changes.find(change => change.won === 50) ? changes.find(change => change.won === 50).amount : 0}</span>개
            </td>
          </tr>
          <tr>
            <td>10원</td>
            <td id="vending-machine-coin-10-quantity">
                <span class="coin-amount">${changes.find(change => change.won === 10) ? changes.find(change => change.won === 10).amount : 0}</span>개
            </td>
          </tr>
          </tbody>
        </table>
      </article>
    `;
  }
  mounted() {
    $('#vending-machine-charge-button').addEventListener('click', this.charge);
  }
  validate(splitedChanges) {
    const total = splitedChanges.reduce()
    return
  }
  charge() {
    const chargeAmount = Number.parseInt($('#vending-machine-charge-input').value);
    if(chargeAmount < 100 || chargeAmount % 10 !== 0) {
      alert('최소 충전 금액은 100원이며, 10원으로 나누어 떨어지는 금액만 충전이 가능하다.');
      $('#vending-machine-charge-input').value = '';
      return;
    } else if(chargeAmount > 100000000) {
      alert('최대 충전금액은 100,000,000원입니다.');
      $('#vending-machine-charge-input').value = '';
      return;
    }
    const splitedChanges = this.splitChanges(chargeAmount);
    const changes = getChanges();
    const newChanges = changes.map(change => {
      const splitedChange = splitedChanges.find(tempChange => tempChange.won === change.won);
      change.amount += splitedChange.amount;
      return change;
    });

    const total = splitedChanges.reduce((sum, change) => {
      const {won, amount} = change;
      sum += won * amount;
      return sum;
    }, 0);
    console.assert(chargeAmount === total, `${chargeAmount} !== ${total} : ${JSON.stringify(splitedChanges)}`);

    setChanges(newChanges);
    this.render();
  }
  splitChanges(chargeAmount) {
    const newChanges = [
      {
        won: 500,
        amount: 0
      },
      {
        won: 100,
        amount: 0
      },
      {
        won: 50,
        amount: 0
      },
      {
        won: 10,
        amount: 0
      }
    ];
    let restChargeAmount = chargeAmount;
    while(restChargeAmount > 0) {
      if(restChargeAmount < 50 && restChargeAmount >= 0) {   // 50원 미만인 경우는 남은 금액만큼 모두 10원짜리로 충전
        const won = 10;
        const changeAmount = restChargeAmount / won;
        const totalChargeAmount = won * changeAmount;
        const won10 = newChanges.find(change => change.won === won);
        won10.amount = won10.amount + changeAmount;
        restChargeAmount -= totalChargeAmount;
      }
      restChargeAmount > 0 && newChanges.forEach(change => {
        if(restChargeAmount >= change.won) {
          const maxAmount = restChargeAmount / change.won;  // 바꿀 수 있는 최대 수량
          const tempChangeAmount = getRandomIntInclusive(1, maxAmount); // 1~최대 수량 이내에 바꿀 수량 (랜덤)
          const totalChargeAmount = change.won * tempChangeAmount;  // 실제 바꿀 총액
          change.amount = change.amount + tempChangeAmount; // 현재 수량 + 바꿀 수량
          restChargeAmount -= totalChargeAmount;  // 바꿔야 할 전체 금액에서 실제 금액 제외
        }
      });
    }
    return newChanges;
  }
}