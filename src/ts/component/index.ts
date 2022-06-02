import NavigationComponent from './Navagation';
import ToastComponent from './Toast';

export default () => {
  window.customElements.define('nav-component', NavigationComponent);
  window.customElements.define('toast-component', ToastComponent);
};
