import { routing } from '../router';

const usePushState = (path) => {
  window.history.pushState('', '', path);

  const paths = [];
  paths.push(path);

  const component = routing(paths);
  const child = document.querySelector('main').childNodes[0];

  child.replaceWith(component.render());
  component.eventListeners();
};

export default usePushState;
