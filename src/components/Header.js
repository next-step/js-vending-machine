import usePushState from '../utils/usePushState';
import Title from './Title';

const Header = (target) => {
  const headerTemplate = `
    <header>
        ${Title('🥤자판기🥤')}
        <button id="product-manage-menu">상품 관리</button>
        <button id="vending-machine-manage-menu">잔돈 충전</button>
        <button id="product-purchase-menu">상품 구매</button>
    </header>
    `;

  target.insertAdjacentHTML('beforeend', headerTemplate);

  document.querySelector('header').addEventListener('click', (e) => {
    switch (e.target.id) {
      case 'product-manage-menu':
        usePushState('product-management');
        break;
      case 'vending-machine-manage-menu':
        usePushState('charge-changes');
        break;
      case 'product-purchase-menu':
        usePushState('product-purchase');
        break;
      default:
        break;
    }
  });
};

export default Header;
