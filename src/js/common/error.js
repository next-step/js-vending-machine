export const ERROR_MESSAGE = {
    InputRequiredStock: '상품명, 가격, 수량을 입력해주세요.',
    InputMinInsufficientError: '가격을 100원 이상 입력해주세요.',
    InputPriceUnitError: '가격을 10원 댠위로 입력해주세요.',
    InputMinQuantityError: '수량을 1개 이상 입력해주세요.',
};

export class CustomError extends Error {
    constructor(message, name) {
        super(message);
        this.name = name;
    }
}

export class InputError extends CustomError {
    constructor(message) {
        super(message, 'InputError');
    }
}
