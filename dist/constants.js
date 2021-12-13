export const ErrorMsgs = {
    inventory_spaceBetween: '공백 불가',
    inventory_PriceMinimum: '최소금액은 100원',
    inventory_PriceLimit: '10원 이하 입력 불가',
    inventory_AmountMinimum: '수량은 1개 이상',
    charge_calculateError: '동전교환 후에도 잔액이 남은건 뭔가 문제가 있다는 뜻',
    store_initError: 'unable to initialize store',
};
export const CoinKeys = ['total', 'q500', 'q100', 'q50', 'q10'];
export const CoinValues = Object.freeze([500, 100, 50, 10]);
export const StateKeys = ['route', 'inventory', 'coins', 'charge'];
export const InitialState = {
    route: "productInventory" /* productInventory */,
    inventory: [],
    coins: {
        total: 0,
        q500: 0,
        q100: 0,
        q50: 0,
        q10: 0,
    },
    charge: 0,
};
//# sourceMappingURL=constants.js.map