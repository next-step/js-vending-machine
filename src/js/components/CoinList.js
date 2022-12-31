/* eslint-disable dot-notation */
/* eslint-disable class-methods-use-this */
import ERROR_MESSAGES from '../constants/errorMessages.js';
import { MINIMUM_CHARGING_MONEY } from '../constants/vendingMachine.js';
import { amountNotDividedZero } from '../validate.js';
import { getItem } from '../utils/Storage.js';
import { subject } from '../../../index.js';

customElements.define(
  'coin-list',
  class extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
      this.template = document.createElement('template');
      this.state = getItem('state').coins;
      subject.subscribe(this);
    }

    connectedCallback() {
      this.init();
      this.render();
    }

    validate(amount) {
      if (amount < MINIMUM_CHARGING_MONEY) throw new Error(ERROR_MESSAGES.TOO_SMALL_CHARGING_MONEY);
      if (amountNotDividedZero(amount)) {
        throw new Error(ERROR_MESSAGES.NOT_DIVISIBLE_CHARGING_MONEY);
      }
    }

    setState() {
      this.state = getItem('state').coins;
      this.render();
    }

    render() {
      const coinListHTML = Object.entries(this.state)
        .sort((a, b) => b[0] - a[0])
        .map(
          ([coin, amount]) =>
            `<tr>
				<td>${coin}원</td>
				<td data-cy="coins">
					${amount.toLocaleString('ko-KR')}개
				</td>
			</tr>`,
        )
        .join('');

      const $tbody = this.shadow.querySelector('tbody');
      $tbody.innerHTML = coinListHTML;
    }

    init() {
      this.template.innerHTML = `
				<link rel="stylesheet" href="./src/css/index.css" />
        <h3>동전 보유 현황</h3>
        <table class="cashbox-remaining pressed">
          <thead>
            <tr>
              <th>동전</th>
              <th>개수</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>`;

      this.shadow.appendChild(this.template.content.cloneNode(true));
    }
  },
);
