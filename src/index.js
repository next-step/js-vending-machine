import './components/index.js';
import { $element } from './helpers/index.js';
import clickableMethods from './helpers/mixins/Button.js';

// App entry는 mixins을 조합한다? 얘만 함수형???흠;

const App = () => {
  const template = /*html*/ `
	<div id="app">
		<header>
			<div>
				<h3>자판기</h3>
			</div>
			<nav>
				<button id="product-manage-menu">상품 관리</button>
				<button id="vending-machine-manage-menu">잔돈 충전</button>
				<button id="product-purchase-menu">상품 구매</button>
			</nav>
		</header>
		<main>
      <machine-product></machine-product>
    </main>
	</div>`;

  function Nav(element) {
    this.$el = element.querySelector('nav');
    this.$target = element.querySelector('main');
  }

  Object.assign(Nav.prototype, clickableMethods);

  const $template = $element(template);
  const $nav = new Nav($template);
  $nav.init();

  return $template;
};

document.body.insertAdjacentElement('afterbegin', App());
