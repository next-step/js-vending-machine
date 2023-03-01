import ERROR_MESSAGES from '../constants/errorMessages.js';
import { MINIMUM_CHARGING_MONEY } from '../constants/vendingMachine.js';
import { amountNotDividedZero } from '../validate.js';
import { getItem } from '../utils/Storage.js';
import subject from '../utils/subject.js';
import { buyProduct } from '../action.js';

customElements.define(
  'purchase-list',
  class extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
      this.template = document.createElement('template');
      this.state = getItem('state').products;
      subject.subscribe(this);
    }

    connectedCallback() {
      this.initHtml();
      this.setEvent();
      this.render();
    }

    setState() {
      this.state = getItem('state').products;
      this.render();
    }

    validate(amount) {
      if (amount < MINIMUM_CHARGING_MONEY) throw new Error(ERROR_MESSAGES.TOO_SMALL_CHARGING_MONEY);
      if (amountNotDividedZero(amount)) {
        throw new Error(ERROR_MESSAGES.NOT_DIVISIBLE_CHARGING_MONEY);
      }
    }

    setEvent() {
      this.shadow.addEventListener('click', event => {
        const selectedName = event.target.closest('tr').querySelector('.name').innerHTML;
        try {
          buyProduct(selectedName);
        } catch (error) {
          if (error instanceof Error) {
            alert(error.message);
            return;
          }
          console.error(error);
        }
      });
    }

    render() {
      const productListHTML = this.state
        .map(
          ({ name, price, quantity }) =>
            `<tr>
					<td class="name">${name}</td>
					<td>${price.toLocaleString('ko-KR')}</td>
					<td>${quantity.toLocaleString('ko-KR')}</td>
				</tr>`,
        )
        .join('');

      const $tbody = this.shadow.querySelector('tbody');
      $tbody.innerHTML = productListHTML;
    }

    initHtml() {
      this.template.innerHTML = `
				<link rel="stylesheet" href="./src/css/index.css" />
				<table data-cy="purchase-list" class="purchase-list pressed">
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody>
				</tbody>
      </table>`;

      this.shadow.appendChild(this.template.content.cloneNode(true));
    }
  },
);
