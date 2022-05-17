import { PageList, PathType, PageType, PAGE } from './pages';
import { isPredicatedElement } from '../utils/predicator';

const updateAnchorElement = (path: string) => {
  const preActiveAnchor = document.querySelector('a.active');
  const nextActiveAnchor = document.querySelector(`a[href="#${path}"]`);

  if (isPredicatedElement(preActiveAnchor)) {
    preActiveAnchor.classList.remove('active');
  }
  if (isPredicatedElement(nextActiveAnchor)) {
    nextActiveAnchor.classList.add('active');
  }
};

const route = () => {
  const path = <PathType>location.hash.substring(1) || PAGE.products.path;
  const currentView = <PageType>PageList.find(page => path === page.path);

  try {
    const data = currentView.props;
    currentView.view.render(data);
  } catch (err: Error | unknown) {
    if (currentView) {
      currentView.view.render(null);
      return;
    }

    PAGE['error'].view.render(null);
  }

  updateAnchorElement(path);
};

const router = () => {
  window.addEventListener('DOMContentLoaded', route);
  window.addEventListener('hashchange', route);
};

export default router;
