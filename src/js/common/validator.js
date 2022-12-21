import {
    ERROR_MESSAGE,
    CustomError, InputError,
} from './error.js';
import { MIN } from './const.js';
import { getObjectLength } from '../utils/util.js';


export class Validator {
    hasObjectLength = (object) => getObjectLength(object) > 0;
    setStockErrors = (values) => {
        if (Object.values(values).filter(value => !!value).length < 3) {
            throw new InputError(ERROR_MESSAGE.InputRequiredStock);
        }

        if (values.price < MIN.PRICE) {
            throw new InputError(ERROR_MESSAGE.InputMinInsufficientError);
        }

        if (values.price % MIN.PRICE_UNIT !== 0) {
            throw new InputError(ERROR_MESSAGE.InputPriceUnitError);
        }

        if (values.quantity < MIN.QUANTITY) {
            throw new InputError(ERROR_MESSAGE.InputMinQuantityError);
        }
    };

    setRechargeErrors = (coin) => {
        if (coin < 100) {
            throw new InputError(ERROR_MESSAGE.InputMinInsufficientError);
        }

        if (coin % MIN.PRICE_UNIT !== 0) {
            throw new InputError(ERROR_MESSAGE.InputPriceUnitError);
        }
    }

    catchErrors(e) {
        if (!e instanceof CustomError) {
            throw e;
        }
        alert(e.message);
    }
}