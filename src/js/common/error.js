import { MIN } from './const.js';

export const ERROR_MESSAGE = {
    InputRequiredStock: '상품명, 가격, 수량을 입력해주세요.',
    InputMinInsufficientError: `가격을 ${ MIN.PRICE }원 이상 입력해주세요.`,
    InputPriceUnitError: `가격을 ${ MIN.PRICE_UNIT }원 댠위로 입력해주세요.`,
    InputMinQuantityError: `수량을 ${ MIN.QUANTITY }개 이상 입력해주세요.`,
    NotAllowedInstanceOfAbstract: '추상 클래스로 인스턴스를 생성할 수 없습니다.'
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

export class InstanceOfAbstractError  extends CustomError {
    constructor(message) {
        super(message, 'InstanceOfAbstractError');
    }
}

