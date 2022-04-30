# Step1 자판기 미션

## 기능 명세

**상품 관리탭에서, 다음과 같은 규칙을 바탕으로 상품을 추가한다.**

- [x] 최초 상품 목록은 비워진 상태이다.

- [x] 상품명, 금액, 수량을 추가할 수 있다.

- [x] 상품 추가 입력 폼에 상품명, 금액, 수량을 차례로 입력한다.

- [x] 상품명, 금액, 수량은 공백이 불가능하다.

- [x] 상품의 최소 수량은 1개여야 한다.

- [x] 상품의 최소 가격은 100원이며, 10원으로 나누어 떨어져야 한다.

- 예) 콜라 / 110원 / 5개
- 예) 사이다 / 100원 / 100개

- [x] 같은 상품명의 데이터를 추가하면 기존의 상품에 해당하는 데이터는 새로운 상품으로 대체된다.

- 콜라 / 1000원 / 12개(전) -> 콜라 / 1500원 / 10개(후) => 콜라 / 1500원 / 10개(결과)

- [x] 사용자는 추가한 상품을 확인할 수 있다.

- [x] 상품의 이름, 가격, 수량 순으로 상품 목록이 보여진다.

- [x] 상품 목록은 탭을 이동하여도 기존의 상품 목록이 유지되어야 한다.

## 핵심 명세

1. 최초 상품 공백
2. 동일 상품 시 대체
3. 상품 목록 유지

## 테스트 코드

- [x] 최초 상품 공백 체크
- [x] input value가 공백 상태에서 submit 상황
- [x] 상품 가격 (나누어 떨어지지 않을 때 / 나누어 떨어질 때) 상황
- [x] 동일 상품 시 대체
- [x] 추가한 상품에 따라 Domain / UI 테스트
- [x] 상품 목록 유지 테스트

## To Do 주석 활용

- TODO
- FIXME
- COMPLETE
- MEMO
- BUG

## Keyword

1. Web Component

2. Router

3. MVC

4. 상태관리

## Page

[Page Link](../TEMPLATE.md)

1. 자판기 돈통 충전 (업체의 화면)
2. 상품 추가 (업체의 화면)
3. 유저 상품 구매 (유저의 화면)

### Web Component

1. vending-machine-router

```html
<nav id="router">
  <button id="product-manage-menu">상품관리</button>
  <button id="vending-machine-manage-menu">잔돈충전</button>
  <button id="product-purchase-menu">상품구매</button>
</nav>
```

2. product-inventory

```html
<table class="product-inventory">
  <colgroup>
    <col style:"width: 140px"> <col style:"width: 140px"> <col style:"width:
    140px">
  </colgroup>
  <thead>
    <tr>
      <th>상품명</th>
      <th>가격(원)</th>
      <th>수량(개)</th>
    </tr>
  </thead>
  <tbody id="product-inventory-container" data-manage="product"></tbody>
</table>
```

3. product-dashboard

```html
<form id="product-dashboard">
  <label for="product-name-input"></label>
  <input
    type="text"
    id="product-name-input"
    placeholder="상품명"
    data-product="name-input"
    required
  />
  <label for="product-price-input"></label>
  <input
    type="number"
    id="product-price-input"
    placeholder="가격"
    data-product="price-input"
    min="10"
    max="100000"
    required
  />
  <label for="product-quantity-input"></label>
  <input
    type="number"
    id="product-quantity-input"
    placeholder="수량"
    data-product="quantity-input"
    min="1"
    max="100"
    required
  />
  <button type="submit" id="product-add-button" data-product="add-button">
    추가하기
  </button>
</form>
```

### Template

1. ProductManageMenu

```html
<h1>🧃 자판기 미션 🧃</h1>
<vending-machine-router></vending-machine-router>
<product-dashboard></product-dashboard>
<product-inventory></product-inventory>
```
