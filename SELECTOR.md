## 메뉴

- `금액 충전` 및 `상품 구매`, `잔돈 반환`을 하기 위한 메뉴 id는 `product-purchase-menu`이다.
- 자판기에 `잔돈 충전`을 위한 메뉴 id는 `vending-machine-manage-menu`이다.
- 자판기에 `상품 관리`를 위한 메뉴 id는 `product-manage-menu`이다.

## 상품 구매 및 금액 충전 메뉴

- 금액 충전 입력 요소의 id는 `charge-input`이다.
- 충전 버튼 요소의 id는 `charge-button`이다.
- 충전된 금액을 확인하는 요소의 id는 `charge-amount`이다.
- 반환하기 버튼 요소의 id는 `coin-return-button`이다.
- 반환된 동전의 개수는 테이블 형태이다.
  - 각 동전의 개수에 해당하는 요소의 id는 다음과 같다.
  - 500원: `coin-500-quantity`
  - 100원: `coin-100-quantity`
  - 50원: `coin-50-quantity`
  - 10원: `coin-10-quantity`
- 각 상품의 구매 버튼에 해당하는 요소의 class명은 `purchase-button`이다.
- 각 상품 목록의 이름에 해당하는 요소의 class명은 `product-purchase-name`이다.
- 각 상품 목록의 가격에 해당하는 요소의 class명은 `product-purchase-price`이다.
- 각 상품 목록의 수량에 해당하는 요소의 class명은 `product-purchase-quantity`이다.
- 각 상품 목록의 이름은 `dataset` 속성을 사용하고 `data-product-name` 형식으로 저장한다.
- 각 상품 목록의 가격은 `dataset` 속성을 사용하고 `data-product-price` 형식으로 저장한다.
- 각 상품 목록의 수량은 `dataset` 속성을 사용하고 `data-product-quantity` 형식으로 저장한다.

## 자판기 잔돈(보유 금액) 충전 메뉴

- 동전을 무작위로 생성하는 기능은 `/lib/` 내부의 랜덤 유틸 중 `Random.pick` 메서드를 활용해서 구현한다.
- 자판기가 보유할 금액을 충전할 요소의 id는 `vending-machine-charge-input`이다.
- `충전하기` 버튼에 해당하는 요소의 id는 `vending-machine-charge-button`이다.
- 충전된 금액을 확인하는 요소의 id는 `vending-machine-charge-amount` 이다.
- 보유한 동전의 개수는 테이블 형태이다.
  - 각 동전의 개수에 해당하는 요소의 id는 다음과 같다.
  - 500원: `vending-machine-coin-500-quantity`
  - 100원: `vending-machine-coin-100-quantity`
  - 50원: `vending-machine-coin-50-quantity`
  - 10원: `vending-machine-coin-10-quantity`

## 상품 관리 메뉴

- 상품 관리 입력 폼의 상품명 입력 요소의 id는 `product-name-input`이다.
- 상품 관리 입력 폼의 상품 가격 입력 요소의 id는 `product-price-input`이다.
- 상품 관리 입력 폼의 수량 입력 요소의 id는 `product-quantity-input`이다.
- 상품 관리를 위한 관리 버튼 요소의 id는 `product-add-button`이다.
- 관리한 상품 목록의 이름에 해당하는 요소의 class명은 `product-manage-name`이다.
- 관리한 상품 목록의 가격에 해당하는 요소의 class명은 `product-manage-price`이다.
- 관리한 상품 목록의 수량에 해당하는 요소의 class명은 `product-manage-quantity`이다.
