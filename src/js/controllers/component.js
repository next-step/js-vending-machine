import { ERROR_MESSAGE, InstanceOfAbstractError } from '../common/error.js';
import { Validator } from '../common/validator.js';

export class Component {
    _vendingMachine;
    _validator;
    _$parent;

    constructor(container) {
        this._vendingMachine = container.vendingMachine;
        this._validator = container.validator;
        this._$parent = container.$parent;
        if (this.constructor === Component) {
            throw new InstanceOfAbstractError(ERROR_MESSAGE.NotAllowedInstanceOfAbstract);
        }
    }

    _init() {}

}