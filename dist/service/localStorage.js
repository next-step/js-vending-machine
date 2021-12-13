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
        return JSON.parse(value);
    }
    set(newValue) {
        this.#storage.setItem(this.#key, JSON.stringify(newValue));
    }
    clean() {
        this.#storage.removeItem(this.#key);
    }
}
//# sourceMappingURL=localStorage.js.map