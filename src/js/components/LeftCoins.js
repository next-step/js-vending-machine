import { getItem } from '../utils/Storage.js';
import { subject } from '../../../index.js';
import { setReturnCoins } from '../action.js';

customElements.define(
  'left-coins',
  class extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
      this.template = document.createElement('template');
      this.state = getItem('state').returnCoins;
      subject.subscribe(this);
    }

    connectedCallback() {
      this.initHtml();
      this.setEvent();
      this.render();
    }

    setEvent() {
      this.shadow.addEventListener('click', () => {
        setReturnCoins();
      });
    }

    setState() {
      this.state = getItem('state').returnCoins;
      this.render();
    }

    render() {
      const coinListHTML = Object.entries(this.state)
        .sort((a, b) => b[0] - a[0])
        .map(
          ([coin, amount]) =>
            `<tr>
              <td>${coin}원</td>
              <td data-cy="coins">${amount.toLocaleString('ko-KR')}개</td>
            </tr>`,
        )
        .join('');

      const $tbody = this.shadow.querySelector('tbody');
      $tbody.innerHTML = coinListHTML;
    }

    initHtml() {
      this.template.innerHTML = `
				<link rel="stylesheet" href="./src/css/index.css" />
				<h3>잔돈</h3>
				<form>
					<input type="button" class="btn" id="coin-return-button" value="반환하기"/>
				</form>
        <table class="cashbox-change pressed">
          <thead>
            <tr>
              <th>동전</th>
              <th>개수</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>`;

      this.shadow.appendChild(this.template.content.cloneNode(true));
    }
  },
);
