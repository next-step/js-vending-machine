export const $ = {
    APP: '#app',
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
    RECHARGE: {
        CONTAINER: '.recharge-container',
        BUTTONS: {
            RECHARGE: '#recharge-button'
        },
        INPUTS: {
            AMOUNT: '#recharge-input'
        },
        AMOUNT: '#recharge-amount',
        TABLE: {
            CONTAINER: '.recharge-cashbox-table',
            TBODY: '#recharge-cashbox-container'
        }
    }
};

export const EVENT = {
    CLICK: 'click',
    KEYUP: 'keyup'
};

export const MIN = {
    PRICE: 100,
    PRICE_UNIT: 10,
    QUANTITY: 1
}

export const COINS = [
    { coin: 500, quantity: 0 },
    { coin: 100, quantity: 0 },
    { coin: 50, quantity: 0 },
    { coin: 10, quantity: 0 }
]

Object.freeze(EVENT);
Object.freeze(COINS);

