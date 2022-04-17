interface MessageContainer {
  readonly [prop: string]: string;
}

export const ERROR: MessageContainer = {
  LESS_THAN_MIN_PRICE: '상품 가격은 최소 100원 이상이어야 합니다!',
  NOT_DIVIDED_PRICE: '상품 가격은 10원 단위로 나누어 떨어져야합니다!',
  LESS_THAN_MIN_QUANTITY: '상품 가격은 10원 단위로 나누어 떨어져야합니다!',
  NO_STORAGE_ITEM: '아이템이 존재하지 않습니다!',
  NO_PRODUCT_ITEM: '🎁 상품을 추가해주세요!🎁 ',
};