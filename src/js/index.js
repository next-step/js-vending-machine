/*
1. 라우팅이 필요할듯 함
  path로 잡으면 서버가 필요하므로 hash아이디로 해보자 ..
2. 라우팅이 되어 다른 탭의 index를 부르더라도 앱의 모든 상태는 유지 되어야함.
  외부 상태관리저장소가 필요함.
3. localStorage를 통해 다시 접속하여도 동일한데이터가 유지되어야 함.
  앱이 켜질때 또는 꺼질때 storage상태를 체크해서 넣고 빼고 해야함.

패턴이 아니더라도 의존성 없이 잘 분리해보자 허허
Model: 데이터(State) 저장공간
View: 유저에게 컨트롤러에서 변화된 모델의 데이터 기반으로 제공될 화면 변화 로직
Controller: 유저 액션을 통해 발생될 비즈니스 로직 (변경된 state로 렌더링도 유발)
Event: Controller에 이미 상속된 View에 있는 Element와 controller로직을 Dom 이벤트에 바인딩
*/

import ProductController from './controller/productController.js';
import ProductEvent from './event/productEvent.js';
import VendingMachineModel from './model/vendingMachineModel.js';
import ProductView from './view/productView.js';

const vendingMachineModel = new VendingMachineModel();
const productView = new ProductView();
const productController = new ProductController({ model: vendingMachineModel, view: productView });
const productEvent = new ProductEvent(productController);

// const chargingView = new ChargingView();
// const chargingController = new ChargingController({model:vendingMachineModel, view: chargingView});
// const chargingEvent = new ChargingEvent(chargingController)
