import { PageList, PathType, PageType, PAGE } from './pages';

const updateAnchorElement = (path: string) => {
  const isAnchorElement = (anchorEl: Element | null): anchorEl is HTMLAnchorElement => {
    return (anchorEl as HTMLAnchorElement) !== null;
  };

  const preActiveAnchor = document.querySelector('a.active');
  const nextActiveAnchor = document.querySelector(`a[href="#${path}"]`);

  if (isAnchorElement(preActiveAnchor)) {
    preActiveAnchor.classList.remove('active');
  }
  if (isAnchorElement(nextActiveAnchor)) {
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

    PAGE['error'].view.render();
  }

  updateAnchorElement(path);
};

const router = () => {
  window.addEventListener('DOMContentLoaded', route);
  window.addEventListener('hashchange', route);
};

export default router;
