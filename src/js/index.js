/*
1. 라우팅이 필요할듯 함
  path로 잡으면 서버가 필요하므로 hash아이디로 해보자 ..
2. 라우팅이 되어 다른 탭의 index를 부르더라도 앱의 모든 상태는 유지 되어야함.
  외부 상태관리저장소가 필요함.
3. localStorage를 통해 다시 접속하여도 동일한데이터가 유지되어야 함.
  앱이 켜질때 또는 꺼질때 storage상태를 체크해서 넣고 빼고 해야함.
*/

import App from './app.js';

try {
  new App({
    $target: document.querySelector('#app'),
  });
} catch (e) {
  console.error(e);
  alert('앱 초기화 에러 발생');
}
