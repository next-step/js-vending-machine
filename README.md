<p align="middle" >
  <img src="https://nextstep-storage.s3.ap-northeast-2.amazonaws.com/536baaa17ed346bb851cc9f663edb069" width="400">
</p>
  <h1 align="middle">자바스크립트와 Cypress로 구현하는 자판기</h1>
  <p align="middle">
    <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
    <img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
    <img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
    <img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
    <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
  </p>
</p>

### 🗒 공통 요구사항

- 기존 HTML Template을 활용한다.
- 필요하다면 선택자를 참고한다.
- 상단에 탭메뉴가 존재하며 각 탭에 따라 적절한 기능을 수행한다.
- 상품 관리탭은 자판기가 보유하고 있는 물품을 추가하는 기능을 수행한다.
- 잔돈 충전탭은 자판기가 보유할 금액을 충전하는 기능을 수행한다.
- 상품 구매탭은 사용자가 금액을 충전할 수 있으며, 금액에 맞춰 상품을 구매하고, 남은 금액에 대해서는 잔돈을 반환하는 기능을 수행한다.
- 다른 탭으로 이동했다 돌아와도 기존 탭의 상태가 유지되어야 한다.
- localStorage를 이용하여, 새로고침하더라도 가장 최근에 작업한 정보들을 불러올 수 있도록 한다.

### 🎯 Step1 - 상품 관리 / 요구사항

- 상품 관리탭에서, 다음과 같은 규칙을 바탕으로 상품을 추가한다.
- [x] 최초 상품 목록은 비워진 상태이다.
- [o] 상품명, 금액, 수량을 추가할 수 있다.
- [x] 상품 추가 입력 폼에 상품명, 금액, 수량을 차례로 입력한다.
- [x] 상품명, 금액, 수량은 공백이 불가능하다.
- [x] 상품의 최소 수량은 1개여야 한다.
- [x] 상품의 최소 가격은 100원이며, 10원으로 나누어 떨어져야 한다.
  - 예) 콜라 / 110원 / 5개
  - 예) 사이다 / 100원 / 100개
- [x] 같은 상품명의 데이터를 추가하면 기존의 상품에 해당하는 데이터는 새로운 상품으로 대체된다.
- [x] 콜라 / 1000원 / 12개(전) -> 콜라 / 1500원 / 10개(후) => 콜라 / 1500원 / 10개(결과)
- [o] 사용자는 추가한 상품을 확인할 수 있다.
- [x] 상품의 이름, 가격, 수량 순으로 상품 목록이 보여진다.
- [o] 상품 목록은 탭을 이동하여도 기존의 상품 목록이 유지되어야 한다.

### 🎯 Step2 - 상품 관리 / 요구사항

- [x] 잔돈 충전 페이지에서 최초 자판기가 보유한 금액은 0원이며, 각 동전의 개수는 0개이다.
- [o] 관리자는 잔돈 충전 입력 요소에 충전할 금액을 입력한 후, 자판기 동전 충전 버튼을 눌러 자판기가 보유한 금액을 충전할 수 있다.
- [x] 최소 충전 금액은 100원이며, 10원으로 나누어 떨어지는 금액만 충전이 가능하다.
- [x] 자판기가 보유한 금액은 {금액}원 형식으로 나타낸다. (이미지)
  - 예) 1000원 (o) / 1000 원 (x) / 1000 (x)
- [x] 관리자는 잔돈을 누적하여 충전할 수 있다.
- [x] 1000원 충전 -> 500원 충전 => 총 1500원 분량의 동전이 생성됨. (추가)
- [o] 자판기가 보유한 금액 만큼의 동전이 무작위로 생성된다.
- [o] 동전은 500원, 100원, 50원, 10원의 동전만 생성된다.
- [x] 동전의 개수를 나타내는 정보는 {개수}개 형식으로 나타낸다.
  - 예) 1개 (o) / 1 개 (x) / 1 (x)
- [o] 다른 탭을 클릭하여도 자판기가 보유한 금액은 유지되어야 한다.

## ⚙️ Before Started

#### <img alt="Tip" src="https://img.shields.io/static/v1.svg?label=&message=Tip&style=flat-square&color=673ab8"> 로컬에서 서버 띄워서 손쉽게 static resources 변경 및 확인하는 방법

로컬에서 웹서버를 띄워 html, css, js 등을 실시간으로 손쉽게 테스트해 볼 수 있습니다. 이를 위해서는 우선 npm이 설치되어 있어야 합니다. 구글에 `npm install` 이란 키워드로 각자의 운영체제에 맞게끔 npm을 설치해주세요. 이후 아래의 명령어를 통해 실시간으로 웹페이지를 테스트해볼 수 있습니다.

```
npm install -g live-server
```

실행은 아래의 커맨드로 할 수 있습니다.

```
live-server 폴더명
```

<br/>

## 👏 Contributing

만약 미션 수행 중에 개선사항이 보인다면, 언제든 자유롭게 PR을 보내주세요.

<br/>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/next-step/js-vending-machine/issues)에 등록해주세요.

<br/>
