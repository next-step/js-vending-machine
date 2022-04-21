export const $ = (selector, container = document) =>
  container.querySelector(selector);

const parser = new DOMParser();
export const createFragmentWithTemplate = (template) => {
  const $frag = document.createDocumentFragment();
  $frag.append(
    ...parser.parseFromString(template, 'text/html').body.childNodes
  );
  return $frag;
};

export const replaceWithFrag = ({ $app, $frag }) => {
  while ($app.firstChild) {
    $app.removeChild($app.firstChild);
  }

  $app.append(...$frag.childNodes);
};
