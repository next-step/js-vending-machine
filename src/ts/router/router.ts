import { PageList, PathType, PageType, PAGE } from './pages';

const route = () => {
  const path = <PathType>location.hash.substring(1) || PAGE.products.path;
  const currentView = <PageType>PageList.find(page => path === page.path);

  // TODO: is type guard 구문으로 바꾸기
  document.querySelector('a.active')?.classList.remove('active');
  document.querySelector(`a[href="#${path}"]`)?.classList.add('active');

  try {
    const data = currentView.props;
    currentView.view.render(data);
  } catch (err: Error | unknown) {
    if (currentView) {
      currentView.view.render();
      return;
    }

    PAGE['error'].view.render();
  }
};

const router = () => {
  window.addEventListener('DOMContentLoaded', route);
  window.addEventListener('hashchange', route);
};

export default router;
