class HashNavButton extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.hashId = this.getAttribute('hash-id');
  }

  static get observedAttributes() {
    // return ['id'];
  }

  connectedCallback() {
    this.root.innerHTML = `
      <style>
      </style>
      <button class="hash-nav">
        <slot></slot>
      </button>
    `;

    this.$hashNav = this.root.querySelector('.hash-nav');

    this.#render();

    window.addEventListener('hashchange', (event) => {
      this.#render();
    });
    this.$hashNav.addEventListener('click', (event) => {
      event.preventDefault();

      const hashId = `#${this.hashId}`;

      window.location.assign(`${window.location.origin}/${hashId}`);
    });
  }

  disconnectedCallback() {}

  #getHashId() {
    const hashLocation = window.location.hash;

    return hashLocation.replace('#', '');
  }

  #render() {
    if (this.hashId === this.#getHashId()) {
      this.root.querySelector('style').textContent = `
        button {
          all: unset;
          font-size: 0.825rem;
          cursor: pointer;
          border: 1px solid #afafaf;
          border-radius: 6px;
          padding: 0.3rem 0.45rem;
          background-color: black;
          color: white;
        }
      `;
    } else {
      this.root.querySelector('style').textContent = `
        button {
          all: unset;
          font-size: 0.825rem;
          cursor: pointer;
          border: 1px solid #afafaf;
          border-radius: 6px;
          padding: 0.3rem 0.45rem;
          background-color: white;
          color: black;
        }
      `;
    }
  }
}

window.customElements.define('hash-nav-button', HashNavButton);
