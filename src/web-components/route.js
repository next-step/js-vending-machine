import { HASH_NAV_MAP } from '../constants/route.js';
import { getHashId } from '../utils/route.js';

class Route extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.renderRootElement();

    window.addEventListener('hashchange', (event) => {
      this.renderRootElement();
    });
  }

  renderRootElement() {
    const template = document.createElement('template');
    const hashId = getHashId();
    const filteredElement = HASH_NAV_MAP.filter((eachMap) => eachMap.id === hashId);
    const slot = document.createElement('slot');

    if (!filteredElement.length) {
      window.location.assign(`${window.location.origin}/#${HASH_NAV_MAP[0].id}`);
      return;
    }

    template.innerHTML = `${filteredElement[0].rootElement}`;
    slot.appendChild(template.content.cloneNode(true));

    this.root.innerHTML = '';
    this.root.appendChild(slot);
  }
}

window.customElements.define('route-wrapper', Route);
