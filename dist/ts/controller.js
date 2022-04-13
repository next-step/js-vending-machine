import productContainerView from './views/productContainerView.js';
import * as model from './model.js';
import { Page } from './model.js';
import ValidationError from './utils/errorValidation.js';
const controlProductContainerAddProduct = function (product) {
    try {
        const result = model.addProduct(product);
        productContainerView.render(result);
    }
    catch (err) {
        if (err instanceof ValidationError)
            alert(err.message);
        console.log(err);
    }
};
const controlProductContainerRender = function () {
    const result = model.loadProduct();
    productContainerView.render(result);
};
const controlPageView = function (page) {
    switch (page) {
        case Page.ProductManagement:
            controlProductContainerRender();
            break;
        default:
            throw Error('존재하지 않는 page view 입니다.');
    }
};
const init = () => {
    productContainerView.addHandlerRender(controlProductContainerRender);
    productContainerView.addHandlerProduct(controlProductContainerAddProduct);
    controlPageView(Page.ProductManagement);
};
init();
//# sourceMappingURL=controller.js.map