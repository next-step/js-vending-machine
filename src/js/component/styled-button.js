const template = document.createElement('template');
template.innerHTML = /** html */ `
<style>
    @import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css'
</style>
<button class="btn btn-secondary"><slot></slot></button>
`;

class StyledButton extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('styled-button', StyledButton);
