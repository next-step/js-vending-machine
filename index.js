// import App from './src/App.js';
// import { routeChange } from './src/router.js';

// new App({ $target: document.querySelector('#app') });

// document.querySelector('.tabs').addEventListener('click', event => {
//   if (!event.target.classList.contains('btn')) return;
//   const url = event.target.id;

//   document.querySelectorAll('.btn').forEach($el => {
//     $el.classList.add('not-pressed');
//     $el.classList.remove('pressed');
//   });
//   event.target.classList.add('pressed');

//   routeChange(`/${url}`);
// });

/* eslint-disable no-param-reassign */
customElements.define(
  'tab-menu',
  class extends HTMLElement {
    constructor() {
      super();

      const template = document.getElementById('tab-menu-template');
      const templateContent = template.content;

      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(templateContent.cloneNode(true));

      const $tabs = this.querySelectorAll('li');
      const $tabContents = this.querySelectorAll('div');

      const selectedStyle = $item => {
        $item.style.color = '#31344b';
        $item.style.backgroundColor = '#e6e7ee';
        $item.style.borderColor = '#e6e7ee';
        $item.style.boxShadow = 'inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #ffffff';
      };

      const unSelectedStyle = $item => {
        $item.style.boxShadow = '3px 3px 6px #b8b9be, -3px -3px 6px #ffffff';
        $item.style.borderColor = '#e6e7ee';
        $item.style.backgroundColor = '#e6e7ee';
      };

      const isSelectedTab = ($tabContent, $selectedItem) =>
        $tabContent.getAttribute('tab-name') === $selectedItem.id;

      const updateDisplay = ($tabContent, $selectedItem) => {
        $tabContent.removeAttribute('slot');
        if (!isSelectedTab($tabContent, $selectedItem)) return;

        $tabContent.setAttribute('slot', 'selected');
        selectedStyle($selectedItem);
        $selectedItem.classList.add('pressed');
        $selectedItem.classList.remove('not-pressed');
      };

      const handleOnClick = $selectedItem => {
        $selectedItem.addEventListener('click', () => {
          $tabs.forEach($item => unSelectedStyle($item));
          $tabs.forEach($item => {
            $item.classList.remove('pressed');
            $item.classList.add('not-pressed');
          });

          $tabContents.forEach($tabContent => {
            updateDisplay($tabContent, $selectedItem);
          });
        });
      };

      $tabs.forEach($item => handleOnClick($item));
    }
  },
);
