const HASH_NAV_MAP = [
  { id: 'product-manage-menu', nameKor: '상품 관리', rootElement: '<product-manage></product-manage>' },
  { id: 'vending-machine-manage-menu', nameKor: '잔돈 충천', rootElement: '<charging-money></charging-money>' },
];

class Route extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
  }

  #getHashId() {
    const hashLocation = window.location.hash;

    return hashLocation.replace('#', '');
  }

  renderRootElement() {
    const template = document.createElement('template');
    const hashId = this.#getHashId();
    const filteredElement = HASH_NAV_MAP.filter((eachMap) => eachMap.id === hashId);
    const slot = document.createElement('slot');

    if (!filteredElement.length) {
      window.location.assign(`${window.location.origin}/#${HASH_NAV_MAP[0].id}`);
      return;
    }

    template.innerHTML = `${filteredElement[0].rootElement}`;
    slot.appendChild(template.content.cloneNode(true));
    //*TODO: 싹 다 비우는 것 말고 갈아 치우는 방식을 생각해야함.
    this.root.innerHTML = '';
    this.root.appendChild(slot);
  }

  connectedCallback() {
    this.renderRootElement();

    window.addEventListener('hashchange', (event) => {
      this.renderRootElement();
    });
  }
}

window.customElements.define('route-wrapper', Route);
