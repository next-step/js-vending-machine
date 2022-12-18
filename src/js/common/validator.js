import {
    ERROR_MESSAGE,
    CustomError, InputError,
} from './error.js';
import { MIN } from './const.js';


export class Validator {
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

    catchErrors(e) {
        if (!e instanceof CustomError) {
            throw e;
        }
        alert(e.message);
    }
}