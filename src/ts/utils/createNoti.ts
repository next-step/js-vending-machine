import { isPredicatedElement } from './predicator';

export const createNotification = (message = 'Error Message') => {
  const toastsEl = document.getElementById('toasts');    
  const notificationEl = document.createElement('div');
  notificationEl.classList.add('toast');
  notificationEl.innerText = message;

  if (!isPredicatedElement(toastsEl)) {
    throw new Error('Toast Element is not Exist.');
  }

  toastsEl.appendChild(notificationEl);

  setTimeout(() => {
    notificationEl.remove();
  }, 3000);
};
