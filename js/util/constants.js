export const MIN_PRODUCT_PRICE = 100;
export const PRODUCT_STANDARD_PRICE = 10;
export const MIN_PRODUCT_NUMBER = 1;

export const NOTIFY_KEY = {
	CHANGE_TAB: "CHANGE_TAB",
	ADD_PRODUCT: "ADD_PRODUCT",
};

export const ERROR_MESSAGE = {
	OVER_STANDARD_VALUE(value) {
		return `${value} 이상의 값을 입력해 주세요`;
	},
	REQUIRED_VALUE: "값을 입력해 주세요",
	NUMBER_VALUE: "숫자를 입력해 주세요",
};
