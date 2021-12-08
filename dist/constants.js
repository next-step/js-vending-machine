export const ErrorMsgs = {
    inventory_spaceBetween: '공백 불가',
    inventory_PriceMinimum: '최소금액은 100원',
    inventory_PriceLimit: '10원 이하 입력 불가',
    inventory_AmountMinimum: '수량은 1개 이상',
    charge_calculateError: '동전교환 후에도 잔액이 남은건 뭔가 문제가 있다는 뜻',
    store_initError: 'unable to initialize store',
};
export var Route;
(function (Route) {
    Route["machineCharge"] = "machineCharge";
    Route["productInventory"] = "productInventory";
    Route["userPurchase"] = "userPurchase";
})(Route || (Route = {}));
export var CoinKey;
(function (CoinKey) {
    CoinKey["total"] = "total";
    CoinKey["q500"] = "q500";
    CoinKey["q100"] = "q100";
    CoinKey["q50"] = "q50";
    CoinKey["q10"] = "q10";
})(CoinKey || (CoinKey = {}));
export const CoinKeys = [CoinKey.total, CoinKey.q500, CoinKey.q100, CoinKey.q50, CoinKey.q10];
export const CoinValues = Object.freeze([500, 100, 50, 10]);
export var StateKey;
(function (StateKey) {
    StateKey["route"] = "route";
    StateKey["inventory"] = "inventory";
    StateKey["saving"] = "saving";
})(StateKey || (StateKey = {}));
export const StateKeys = [StateKey.route, StateKey.inventory, StateKey.saving];
export const InitialState = {
    [StateKey.route]: Route.productInventory,
    [StateKey.inventory]: [],
    [StateKey.saving]: {
        [CoinKey.total]: 0,
        [CoinKey.q500]: 0,
        [CoinKey.q100]: 0,
        [CoinKey.q50]: 0,
        [CoinKey.q10]: 0,
    },
};
//# sourceMappingURL=constants.js.map