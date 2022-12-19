export const $ = {
    TAB: {
        STOCK: '#stock-manage-menu',
        RECHARGE: '#vending-machine-manage-menu',
        PURCHASE: '#product-purchase-menu'
    },
    STOCK: {
        CONTAINER: '.stock-container',
        BUTTONS: {
            ADD: '#stock-add-button',
        },
        INPUTS: {
            NAME: '#stock-name-input',
            PRICE: '#stock-price-input',
            QUANTITY: '#stock-quantity-input'
        },
        TABLE: {
            CONTAINER: '.stock-inventory',
            TBODY: '#stock-inventory-container'
        }
    },
};

export const EVENT = {
    CLICK: 'click'
};

export const MIN = {
    PRICE: 100,
    PRICE_UNIT: 10,
    QUANTITY: 1
}

Object.freeze(EVENT);

