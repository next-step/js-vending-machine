import { $ELEMENT } from '../../constants/element.js';

const template = document.createElement('template');
template.innerHTML = /* html */ `
<link rel="stylesheet" href="/src/css/index.css">
<form class="vending-machine-wrapper">
  <input type="number" name="charge-amount" id="charge-input" placeholder="충전할 금액을 입력해주세요" step="10" min="0" />
  <button id="charge-button">충전하기</button>
</form>
`;

class ChargingMoneyInput extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.typedCoin = 0;
  }

  connectedCallback() {
    this.root.appendChild(template.content.cloneNode(true));

    this.$form = this.root.querySelector('form');
    this.$chargeInput = this.root.querySelector($ELEMENT.CHARGE_INPUT);

    this.$chargeInput.addEventListener('keyup', (event) => {
      this.setTypedCoin(event.target.value);
    });

    this.$form.addEventListener('submit', (event) => {
      event.preventDefault();
      //*TODO 에러처리

      this.dispatchEvent(
        new CustomEvent('onMoneySubmit', {
          detail: {
            value: this.$chargeInput.value,
            clearInput: this.clearInput.bind(this),
          },
        })
      );
    });

    this.renderInput();
  }

  clearInput() {
    this.setTypedCoin(0);
  }

  setTypedCoin(newCoinValue) {
    this.typedCoin = Number(newCoinValue);
    this.renderInput();
  }

  renderInput() {
    this.$chargeInput.value = this.typedCoin === 0 ? null : this.typedCoin;
  }
}

window.customElements.define('charging-money-input', ChargingMoneyInput);
