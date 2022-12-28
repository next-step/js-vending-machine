import App from './src/App.js';
import { routeChange } from './src/router.js';
// import { setItem } from './src/js/utils/Storage.js';
new App({ $target: document.querySelector('#app') });

// !: events 정리하기
document.querySelector('.tabs').addEventListener('click', event => {
  if (!event.target.classList.contains('btn')) return;
  const url = event.target.id;

  document.querySelectorAll('.btn').forEach($el => {
    $el.classList.add('not-pressed');
    $el.classList.remove('pressed');
  });
  event.target.classList.add('pressed');

  routeChange(`/${url}`);
});

// const INITIAL_STATE = {
//   products: [],
//   totalMoney: 0,
//   coins: {
//     500: 0,
//     100: 0,
//     50: 0,
//     10: 0,
//   },
// };

// setItem('state', INITIAL_STATE);
