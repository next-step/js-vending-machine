import { ERROR_MESSAGE, InstanceOfAbstractError } from '../common/error.js';
import { displayNone, setEventListeners } from '../common/util.js';

export class Component {
    _vendingMachine;
    _validator;
    _$parent;
    _listeners;

    constructor(container) {
        this._vendingMachine = container.vendingMachine;
        this._validator = container.validator;
        this._$parent = container.view;
        if (this.constructor === Component) {
            throw new InstanceOfAbstractError(ERROR_MESSAGE.NotAllowedInstanceOfAbstract);
        }
    }

    _init() {
        setEventListeners(this._listeners);
        displayNone(this._$parent);
    }

}