import AbstractView from './abstractView';

//TODO: STEP3,4 - 잔돈 반환 구현 필요
class ReturnContainerView extends AbstractView<HTMLElement, string> {
  private parentElement = document.querySelector('#app')! as HTMLElement;

  render() {
    this.parentElement.innerHTML = '';
    const markup = this.generateMarkup();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  generateMarkup(): string {
    return /* html */ `
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
  }
}

export default new ReturnContainerView();
