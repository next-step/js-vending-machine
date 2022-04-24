import Storage from '../Model/Store/Storage.js';
import { selector, shadowDOMSelector } from '../util/consts.js';

const Component = (function () {
  return {
    router: {
      render(tag = '') {
        selector('#app').innerHTML = String.raw`
          <h1>🧃 자판기 미션 🧃</h1>
          <vending-machine-router></vending-machine-router>
          ${tag && `<${tag}></${tag}>`}
        `;
      },
    },
    user: {
      render() {
        selector('#app');
      },
    },
    cashBox: {
      render() {},
    },

    product: {
      init() {
        shadowDOMSelector('product-dashboard', '#product-name-input').value =
          '';
        shadowDOMSelector('product-dashboard', '#product-price-input').value =
          '';
        shadowDOMSelector(
          'product-dashboard',
          '#product-quantity-input'
        ).value = '';
      },

      //TODO : Stroage에서 꺼내 와서 렌더링도 해야함
      display() {
        const tbody = shadowDOMSelector(
          'product-inventory',
          '#product-inventory-container'
        );
        const storage = Storage.of();
        const fragment = document.createDocumentFragment();
        storage.getStorageProduct.forEach((product) => {
          const tr = document.createElement('tr');
          Object.values(product).forEach((info) => {
            const td = document.createElement('td');
            td.textContent = info;
            tr.appendChild(td);
          });
          fragment.append(tr);
        });
        tbody.append(fragment);
      },

      /**
       * @param {string} tagName
       * @param {Object} product
       *   @type {
       *     name: {string}
       *     price: {string}
       *     quantity: {string}
       *   }
       */
      render(containerName, { product, tagName }) {
        const container = document.createElement(containerName);
        const fragment = document.createDocumentFragment();

        Object.values(product).forEach((info) => {
          const tag = document.createElement(tagName);
          tag.textContent = info;
          fragment.appendChild(tag);
        });
        container.appendChild(fragment);
        return container;
      },

      mount(element) {
        // 상품추가?
        element &&
          shadowDOMSelector(
            'product-inventory',
            '#product-inventory-container'
          ).appendChild(element);
      },

      replace() {
        // TODO: 테이블 교체
      },

      removePreviousComponent() {
        // MEMO : `재귀적으로 shadowRoot를 찾는게 좋을까?`에 대해 리서치
        shadowDOMSelector('product-inventory', '#product-inventory-container')
          .querySelectorAll('tr')
          .forEach((tag) => tag.remove());
      },
    },
  };
})();

export default Component;
