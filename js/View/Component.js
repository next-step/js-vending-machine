import { shadowDOMSelector, shadowDOMSelectorAll } from '../util/consts.js';

const Component = (function () {
  return {
    product: {
      dashboardInit() {
        shadowDOMSelector('product-dashboard', '#product-name-input').value =
          '';
        shadowDOMSelector('product-dashboard', '#product-price-input').value =
          '';
        shadowDOMSelector(
          'product-dashboard',
          '#product-quantity-input'
        ).value = '';
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

      replaceInventoryProduct(order, info) {
        shadowDOMSelectorAll('product-inventory', 'tr')[
          order + 1
        ].childNodes.forEach((td, index) => {
          td.textContent = Object.values(info)[index];
        });
      },

      renderStorageItem(storageItem) {
        const renderStorageProduct = (product, tr) => {
          Object.values(product).forEach((info) => {
            const td = document.createElement('td');
            td.textContent = info;
            tr.append(td);
          });
        };

        const renderStorageAll = (product, fragment) => {
          const tr = document.createElement('tr');
          renderStorageProduct(product, tr);
          fragment.append(tr);
        };

        const fragment = document.createDocumentFragment();

        storageItem?.forEach((product) => {
          renderStorageAll(product, fragment);
        });

        return fragment;
      },

      mount(element) {
        // 상품추가?
        element &&
          shadowDOMSelector(
            'product-inventory',
            '#product-inventory-container'
          ).appendChild(element);
      },
    },
  };
})();

export default Component;
