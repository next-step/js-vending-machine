class Router extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const routerButton = [
      { id: 'product-manage-menu', text: '상품 관리' },
      { id: 'vending-machine-manage-menu', text: '잔돈충전' },
      {
        id: 'product-purchase-menu',
        text: '상품 구매',
      },
    ];

    const container = document.createElement('div');
    container.setAttribute('id', 'router');

    routerButton.forEach((info) => {
      const button = document.createElement('button');
      button.setAttribute('id', info.id);
      button.textContent = info.text;
      container.appendChild(button);
    });

    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', './index.css');
    this.shadowRoot.append(link, container);
  }

  // MEMO lifeCycle
  attributeChangedCallback(name, oldValue, newValue) {}
}

export default Router;
