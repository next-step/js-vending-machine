import { Route } from '../types.js';
export var StateKey;
(function (StateKey) {
    StateKey["route"] = "route";
    StateKey["inven"] = "inven";
})(StateKey || (StateKey = {}));
export const StateKeys = [StateKey.route, StateKey.inven];
export const InitialState = {
    [StateKey.route]: Route.productInven,
    [StateKey.inven]: [],
};
//# sourceMappingURL=types.js.map