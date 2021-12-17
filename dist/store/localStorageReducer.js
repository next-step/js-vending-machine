import LocalStorageService from '../service/localStorage.js';
class LocalStorageReducer {
    #list;
    constructor(keys) {
        this.#list = new Map(keys.map(key => [key, new LocalStorageService(key)]));
    }
    getAll() {
        return [...this.#list].reduce((res, [key, storage]) => {
            const val = storage.get();
            if (val)
                res[key] = val;
            return res;
        }, {});
    }
    get(key) {
        return this.#list.get(key) || new LocalStorageService(key);
    }
    getValue(key) {
        return this.get(key).get();
    }
    set(key, val) {
        const item = this.get(key);
        item.set(val);
        this.#list.set(key, item);
    }
    clean(key) {
        const item = this.get(key);
        item.clean();
        this.#list.set(key, item);
    }
}
export default new LocalStorageReducer(['route', 'inventory', 'charge', 'ownedCoins']);
//# sourceMappingURL=localStorageReducer.js.map