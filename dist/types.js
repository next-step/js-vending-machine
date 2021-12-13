export var Route;
(function (Route) {
    Route["machineCharge"] = "machineCharge";
    Route["productInventory"] = "productInventory";
    Route["userPurchase"] = "userPurchase";
})(Route || (Route = {}));
export var StateKey;
(function (StateKey) {
    StateKey["route"] = "route";
    StateKey["inventory"] = "inventory";
})(StateKey || (StateKey = {}));
export const StateKeys = [StateKey.route, StateKey.inventory];
export const InitialState = {
    [StateKey.route]: Route.productInventory,
    [StateKey.inventory]: [],
};
//# sourceMappingURL=types.js.map