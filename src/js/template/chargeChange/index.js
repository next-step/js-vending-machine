export const getChargeChangeTemplate = () => {
  return `
    <h3>자판기 돈통 충전하기</h3>
    <form class="vending-machine-wrapper">
      <input type="number" name="vending-machine-charge-amount" id="vending-machine-charge-input" min="100" required autoFocus />
      <button id="vending-machine-charge-button" type="submit">충전하기</button>
    </form>
    <p>보유 금액: <span id="vending-machine-charge-amount">0</span>원</p>
    <h3>동전 보유 현황</h3>
    <table class="cashbox-remaining">
      <colgroup>
        <col />
        <col />
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
          <td id="vending-machine-coin-500-quantity"></td>
        </tr>
        <tr>
          <td>100원</td>
          <td id="vending-machine-coin-100-quantity"></td>
        </tr>
        <tr>
          <td>50원</td>
          <td id="vending-machine-coin-50-quantity"></td>
        </tr>
        <tr>
          <td>10원</td>
          <td id="vending-machine-coin-10-quantity"></td>
        </tr>
      </tbody>
    </table>
  `;
};
