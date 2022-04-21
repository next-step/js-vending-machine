import { createFragmentWithTemplate } from '../../utils/dom.js';

const Purchase = ($app, store) => {
  // TODO
  const $frag = createFragmentWithTemplate(purchaseTemplate());
  return {
    $app,
    $frag,
  };
};

const purchaseTemplate = () => `
  <h3>잔돈</h3>
  <button id="coin-return-button">반환하기</button>
  <table class="cashbox-change">
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
        <td id="coin-500-quantity"></td>
      </tr>
      <tr>
        <td>100원</td>
        <td id="coin-100-quantity"></td>
      </tr>
      <tr>
        <td>50원</td>
        <td id="coin-50-quantity"></td>
      </tr>
      <tr>
        <td>10원</td>
        <td id="coin-10-quantity"></td>
      </tr>
    </tbody>
  </table>
`;

export default Purchase;
