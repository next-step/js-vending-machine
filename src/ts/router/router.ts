import { PageList, PAGE } from './pages';
import * as model from '../model';

const route = function (): void {
  let [, path] = location.hash.split('#');
  if (!path) path = PAGE.products.path;

  const currentView = PageList.find(page => path === page.path);
  document.querySelectorAll(`a[href]`)?.forEach(el => el.classList.remove('active'));
  document.querySelector(`a[href="${path}"]`)?.classList.add('active');

    try {
      const data = model.loadData(path);

      if (currentView) currentView.view.render(data);
    } catch (err: Error | unknown) {
      if (currentView && err instanceof Error) {
        currentView.view.renderError(err.message);
        return;
      }

      PAGE['error'].view.render();
    }
};

export const router = () => {
  window.addEventListener('DOMContentLoaded', route);
  window.addEventListener('hashchange', route);
};
