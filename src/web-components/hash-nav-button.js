class HashNavButton extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.hashId = this.getAttribute('hash-id');
  }

  connectedCallback() {
    this.root.innerHTML = /* html */ `
      <link rel="stylesheet" href="/src/css/index.css">
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

  #getHashId() {
    const hashLocation = window.location.hash;

    return hashLocation.replace('#', '');
  }

  #render() {
    if (this.hashId === this.#getHashId()) {
      this.$hashNav.classList.add('active');
    } else {
      this.$hashNav.classList.remove('active');
    }
  }
}

window.customElements.define('hash-nav-button', HashNavButton);
