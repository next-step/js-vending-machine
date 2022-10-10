<p align="middle" >
  <img src="https://nextstep-storage.s3.ap-northeast-2.amazonaws.com/536baaa17ed346bb851cc9f663edb069" width="400">
</p>
  <h1 align="middle">원동휘 / 자바스크립트와 Cypress로 구현하는 자판기</h1>
  <p align="middle">
    <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
    <img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
    <img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
    <img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
    <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
  </p>

## 1 단계 요구사항

- [x] 최초 상품 목록은 비워진 상태이다.
- [x] 상품명, 금액, 수량을 추가할 수 있다.
- [x] 상품명, 금액, 수량은 공백이 불가능하다.
- [x] 상품의 최소 수량은 1개여야 한다.
- [x] 상품의 최소 가격은 100원이며, 10원으로 나누어 떨어져야 한다.
- [x] 같은 상품명의 데이터를 추가하면 기존의 상품에 해당하는 데이터는 새로운 상품으로 대체된다. (이부분이 가장 어려웠음)
- [x] 사용자는 추가한 상품을 확인할 수 있다.
- [x] 상품 목록은 탭을 이동하여도 기존의 상품 목록이 유지되어야 한다.
- [x] 상품 목록은 새로고침해도 기존의 상품 목록이 유지되어야한다.

## 2 단계 요구사항

- [x] 관리자는 잔돈 충전 입력 요소에 충전할 금액을 입력한 후, 자판기 동전 충전 버튼을 눌러 자판기가 보유한 금액을 충전할 수 있다.
- [x] 최소 충전 금액은 100원이며, 10원으로 나누어 떨어지는 금액만 충전이 가능하다.
- [x] 자판기가 보유한 금액은 {금액}원 형식으로 나타낸다.
  - [x] 예) 1000원 (o) / 1000 원 (x) / 1000 (x)
- [x] 관리자는 잔돈을 누적하여 충전할 수 있다.
  - [x] 1000원 충전 -> 500원 충전 => 총 1500원 분량의 동전이 생성됨.
- [x] 자판기가 보유한 금액 만큼의 동전이 무작위로 생성된다.
  - [x] 동전은 500원, 100원, 50원, 10원의 동전만 생성된다.
- [x] 동전의 개수를 나타내는 정보는 {개수}개 형식으로 나타낸다.
  - [x] 예) 1개 (o) / 1 개 (x) / 1 (x)
- [x] 다른 탭을 클릭하여도 자판기가 보유한 금액은 유지되어야 한다.
