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
  }

  connectedCallback() {
    this.root.appendChild(template.content.cloneNode(true));

    this.$form = this.root.querySelector('form');
    this.$chargeInput = this.root.querySelector('#charge-input');

    this.$form.addEventListener('submit', (event) => {
      event.preventDefault();
      //*TODO 에러처리

      this.dispatchEvent(
        new CustomEvent('onSubmit', {
          detail: this.$chargeInput.value,
        })
      );
    });
  }
}

window.customElements.define('charging-money-input', ChargingMoneyInput);
