import App from './src/App.js';
import { routeChange } from './src/router.js';

new App({ $target: document.querySelector('#app') });

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
