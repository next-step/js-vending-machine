export default class LocalStorageService {
    #key;
    #storage;
    constructor(key) {
        this.#storage = window.localStorage;
        this.#key = key;
    }
    get() {
        const value = this.#storage.getItem(this.#key);
        if (value === undefined || value === null || value === '')
            return null;
        return this.toTargetType(value);
    }
    set(newValue) {
        this.#storage.setItem(this.#key, this.toString(newValue));
    }
    clean() {
        this.#storage.removeItem(this.#key);
    }
    toTargetType(data) {
        return JSON.parse(data);
    }
    toString(data) {
        return JSON.stringify(data);
    }
}
//# sourceMappingURL=localStorage.js.map