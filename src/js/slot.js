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
      $item.classList.remove('slot-unselected');
      $item.classList.add('slot-selected');
    }

    unSelectedStyle($item) {
      $item.classList.add('slot-unselected');
    }

    updateDisplay($tabContent, $selectedItem) {
      $tabContent.removeAttribute('slot');
      const isSelectedTab = $tabContent.getAttribute('tab-name') === $selectedItem.id;
      if (!isSelectedTab) return;

      $tabContent.setAttribute('slot', 'selected');
      this.selectedStyle($selectedItem);
    }
  },
);
