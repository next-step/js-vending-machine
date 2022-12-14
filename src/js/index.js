/*
1. 라우팅이 필요할듯 함
  path로 잡으면 서버가 필요하므로 hash아이디로 해보자 ..
2. 라우팅이 되어 다른 탭의 index를 부르더라도 앱의 모든 상태는 유지 되어야함.
  외부 상태관리저장소가 필요함.
3. localStorage를 통해 다시 접속하여도 동일한데이터가 유지되어야 함.
  앱이 켜질때 또는 꺼질때 storage상태를 체크해서 넣고 빼고 해야함.

MVC
Model: 데이터(State) 저장공간
Controller: 유저 액션을 통해 발생될 비즈니스 로직
View: 유저에게 데이터 기반으로 제공될 화면 변화 로직
Ui:DOM element를 핸들링할 파일
Event: 바인딩할 이벤트들을 모아놓을 파일
Index.js: 컨트롤러에 뷰와 모델 주입 및 이벤트를 바인딩 하기
*/
import { addProduct, typeProductName, typeProductPrice, typeProductQuantity } from './controller/productController.js';

addEventListener('keyup', (event) => {
  const { id, value } = event.target;
  if (id === 'product-name-input') {
    typeProductName({ name: value });
  }
  if (id === 'product-price-input') {
    typeProductPrice({ price: value });
  }
  if (id === 'product-quantity-input') {
    typeProductQuantity({ quantity: value });
  }
});

addEventListener('click', (event) => {
  const { id } = event.target;
  if (id === 'product-add-button') {
    addProduct();
  }
});
