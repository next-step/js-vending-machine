/* eslint-disable no-param-reassign */
customElements.define(
  'tab-menu',
  class extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
      this.templateContent = document.getElementById('tab-menu-template').content;
      this.$tabs = this.querySelectorAll('li');
      this.$tabContents = this.querySelectorAll('div');
    }

    connectedCallback() {
      this.init();
    }

    handleOnClick($selectedItem) {
      $selectedItem.addEventListener('click', () => {
        this.$tabs.forEach($item => {
          this.unSelectedStyle($item);
          $item.classList.remove('pressed');
          $item.classList.add('not-pressed');
        });

        this.$tabContents.forEach($tabContent => {
          this.updateDisplay($tabContent, $selectedItem);
        });
      });
    }

    init() {
      this.$tabs.forEach($item => this.handleOnClick($item));
      this.shadow.appendChild(this.templateContent.cloneNode(true));
    }

    selectedStyle($item) {
      $item.style.color = '#31344b';
      $item.style.backgroundColor = '#e6e7ee';
      $item.style.borderColor = '#e6e7ee';
      $item.style.boxShadow = 'inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #ffffff';
    }

    unSelectedStyle($item) {
      $item.style.boxShadow = '3px 3px 6px #b8b9be, -3px -3px 6px #ffffff';
      $item.style.borderColor = '#e6e7ee';
      $item.style.backgroundColor = '#e6e7ee';
    }

    updateDisplay($tabContent, $selectedItem) {
      $tabContent.removeAttribute('slot');
      const isSelectedTab = $tabContent.getAttribute('tab-name') === $selectedItem.id;
      if (!isSelectedTab) return;

      $tabContent.setAttribute('slot', 'selected');
      this.selectedStyle($selectedItem);
      $selectedItem.classList.add('pressed');
      $selectedItem.classList.remove('not-pressed');
    }
  },
);
