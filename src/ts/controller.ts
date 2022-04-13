import productContainerView from './views/productContainerView.js';

const controlProductContainerRender = function (): void {
  productContainerView.render();
};

const init = () => {
  productContainerView.addHandlerRender(controlProductContainerRender);
};

init();
