import type { PathType, PageType } from './pages';
import { PageList, PAGE } from './pages';
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
    currentView.view.render();
  } catch (err: Error | unknown) {
    if (currentView) {
      currentView.view.render();
      return;
    }

    PAGE['error'].view.render();
  }

  updateAnchorElement(path);
};

export default () => {
  window.addEventListener('DOMContentLoaded', route);
  window.addEventListener('hashchange', route);
};

