import { routing } from '../router';

const usePushState = (path) => {
  window.history.pushState('', '', path);

  const _path = [''];
  _path.push(path);

  const component = routing(_path);
  const child = document.querySelector('main').childNodes[0];

  child.replaceWith(component.render());
  component.eventListeners();
};

export default usePushState;
