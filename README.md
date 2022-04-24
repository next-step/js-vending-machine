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

## ❗ 요구사항

### 상품 관리 탭

- [x] 각 탭을 클릭했을 때 알맞은 View를 보여준다.
- [x] 현재 탭을 `localStorage`에 저장해놓고, 새롭게 나갔다 들어와도 유지된다.
- [x] 처음 들어갔을 때 상품명, 금액, 수량을 입력할 수 있는 input이 존재한다.
- [x] 상품명, 금액, 수량은 공백이 불가능하다.
- [x] 수량은 `1`이상인 정수여야 한다.
- [x] 가격은 `100`이상인 정수여야 한다.
- [x] 가격은 `10`으로 나누어 떨어져야 한다.
- [x] 같은 상품명으로 추가시 기존의 데이터를 덮어씌운다.
- [x] 추가된 상품은 이름, 가격, 수량 순으로 테이블에 추가된다.
- [x] 추가된 상품은 `localStorage`를 이용해서 데이터를 유지시킨다.

### 잔돈 충전 탭

- [ ] 잔돈 충전 입력 금액은 100원 이상이다.
- [ ] 잔돈 충전 입력 금액은 10으로 나누어 떨어져야 한다.
- [ ] 잔돈 충전 금액은 `{금액}원` 형식으로 잘 나와야한다.
- [ ] 잔돈 충전 금액 기존 금액에 누적되어 더해진다.
- [ ] 동전들은 금액 만큼 랜덤으로 생성되어 더해진다.
- [ ] 동전의 개수를 나타내는 정보는 `{개수}개` 형식으로 나타낸다.
- [ ] 보유 금액과 동전 보유 현황은 `localStorage`를 이용해서 데이터를 유지시킨다.
