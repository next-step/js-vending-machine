import { ActionType, ClassName, Config, Id } from "../common/constants";
import { globalStore } from "../common/globalStore";
import Component from "../core/Component";
import { $, class2Query, id2Query } from "../core/dom";

export default class CoinChanger extends Component {
  protected componentDidMount(): void {
    this.$target.addEventListener("click", (e: Event) => this.onClick(e));
  }

  private onClick(e: Event) {
    const $eventTarget = e.target as HTMLElement;
    if ($eventTarget.closest(id2Query(Id.coinReturnBtn))) {
      globalStore.dispatch({
        type: ActionType.returnChanges,
      });
    }
  }

  protected htmlTemplate(): string {
    const returnedChanges = globalStore.getState()?.returnedChanges ?? {};

    const tableRowsHTML = Config.ChangeTypes.map(
      (changeType: number) => /*html*/ {
        return /*html*/ `
        <tr>
          <td>${changeType}원</td>
          <td id="${Id.vendingMachineCoinQuantity(changeType)}">
          ${returnedChanges[changeType] ?? 0}개
          </td>
        </tr>`;
      }
    ).join("");

    return /*html*/ `
    <h3>잔돈</h3>
    <button id="${Id.coinReturnBtn}">반환하기</button>
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
      ${tableRowsHTML}
    </table>
    `;
  }
}
