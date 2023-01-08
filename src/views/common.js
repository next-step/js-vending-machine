export function getHTMLElementFromHTMLString(HTMLString) {
  const dummyElement = document.createElement('div');
  dummyElement.innerHTML = HTMLString;
  return dummyElement.childNodes;
}
