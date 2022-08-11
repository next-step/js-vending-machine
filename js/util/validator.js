import { ERROR_MESSAGE } from "../util/constants.js";

class Validator {
	#value;

	constructor(value) {
		this.#value = value;
	}

	static set(value) {
		const instance = new this(value);
		return instance;
	}

	#checkValue() {
		if (!this.#value) throw new Error("값을 설정해 주세요");
	}

	min(minValue, errMsg) {
		this.#checkValue();
		if (this.#value < minValue) {
			throw new Error(errMsg || ERROR_MESSAGE.OVER_STANDARD_VALUE(minValue));
		}
		return this;
	}

	isRequired(errMsg = ERROR_MESSAGE.REQUIRED_VALUE) {
		if (!this.#value) throw new Error(errMsg);
		return this;
	}

	isNumber(errMsg = ERROR_MESSAGE.NUMBER_VALUE) {
		if (isNaN(this.#value)) throw new Error(errMsg);
		return this;
	}

	condition(cb, errMsg) {
		if (!cb(this.#value)) throw new Error(errMsg);
	}
}

export default Validator;
