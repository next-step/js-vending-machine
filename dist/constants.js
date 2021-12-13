export const ErrorBoundaries = {
    inventory_PriceMinimum: 100,
    inventory_PriceLimit: 10,
    inventory_AmountMinimum: 1,
    machine_PriceMinimum: 100,
    machine_PriceLimit: 10,
};
export const ErrorMsgs = {
    inventory_SpaceBetween: '공백 불가',
    inventory_PriceMinimum: `최소금액은 ${ErrorBoundaries.inventory_PriceMinimum}원`,
    inventory_PriceLimit: `${ErrorBoundaries.inventory_PriceLimit}원 이하 입력 불가`,
    inventory_AmountMinimum: `수량은 ${ErrorBoundaries.inventory_AmountMinimum}개 이상`,
    machine_PriceMinimum: `충전금액은 최소 ${ErrorBoundaries.machine_PriceMinimum}원 이상`,
    machine_PriceLimit: `${ErrorBoundaries.machine_PriceLimit}원 이하 입력 불가`,
    machine_CalculateError: '동전교환 후에도 잔액이 남은건 뭔가 문제가 있다는 뜻',
    store_InitError: 'unable to initialize store',
};
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