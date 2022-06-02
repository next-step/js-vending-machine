import { isPredicatedElement } from '../utils/predicator';

export default class NavigationComponent extends HTMLElement {
  private NAV_BOUNDARY = 72;

  connectedCallback() {
    this.render();
    this.setEvent();
  }

  private get navigationElement() {
    return this.querySelector('nav');    
  }

  private render() {
    this.innerHTML = /* html */ `
        <nav>
        <h2>
            자판기</h2>
        <ul>
            <li>
                <a href="#/products" id="product-manage-menu">상품 관리</a>
            </li>
            <li>
                <a href="#/charge" id="vending-machine-manage-menu">잔돈충전</a>
            </li>
            <li>
                <a href="#/purchase" id="product-purchase-menu">상품 구매</a>
            </li>
        </ul>
        </div>
        </nav>
    `;
  }

  setEvent() {
    
    const handleNav = () => {
      if (!isPredicatedElement(this.navigationElement)) {
        throw new Error('Navigation Element not Exist');
      }

      if (window.scrollY > this.navigationElement.offsetHeight + this.NAV_BOUNDARY) {
        this.navigationElement.classList.add('active');
        return;
      }
    
      this.navigationElement.classList.remove('active');
    };

    document.addEventListener('scroll', handleNav);    
  }
}


