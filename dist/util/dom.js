const template = document.createElement('template');
const createElem = (elem) => {
    if (elem instanceof HTMLElement)
        return elem;
    template.replaceChildren();
    template.insertAdjacentHTML('afterbegin', elem);
    return template.firstElementChild;
};
const el = (parent, children) => {
    const parentElem = createElem(parent);
    if (children) {
        const frag = document.createDocumentFragment();
        children.forEach(elem => {
            if (elem instanceof String && !elem.startsWith('<'))
                frag.append(elem);
            else
                frag.appendChild(createElem(elem));
        });
        parentElem.replaceChildren(frag);
    }
    return parentElem;
};
export const getClosest = (source, ancestor) => {
    let current = source;
    while (current.parentElement) {
        const isMatch = current.parentElement.querySelector(ancestor) || null;
        const isEqual = current.matches(ancestor);
        if (isMatch && isEqual)
            return current;
        current = current.parentElement;
    }
    return null;
};
export const getIndex = (elem) => {
    if (!elem.parentElement)
        return -1;
    return Array.prototype.indexOf.call(elem.parentElement.children, elem);
};
export default el;
//# sourceMappingURL=dom.js.map