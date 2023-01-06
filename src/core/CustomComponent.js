import { mergeArrayObjectToOneObject } from "../utils/utils";

export class CustomElement extends HTMLElement {
  elements = {};

  constructor(children = {}) {
    super();
    // children들의 이름들을 모두 elements안에 property로 등록한다.
    // 매번 DOM을 탐색해서 가져오는 것은 비효율적이기 때문이다.
    // 따라서 DOM interface를 해치지 않도록 elements라는 곳 안에 1차원 depth로 모두 넣어준다.
    this.elements = this.#flatDOMLikeObj(children);
    // children들은 모두 DOM을 지켜서 내려준다.
    this.appendChild(children);
  }

  #flatDOMLikeObj(obj) {
    const allElements = [];
    const stack = [obj];
    let currentElement = null;

    while(stack.length > 0) {
      currentElement = stack.pop();
      // element를 등록한다.
      allElements.push(currentElement);
      // 자식이 있으면 그 아래로 내려간다.
      if (currentElement.children) {
        stack.push(currentElement.children);
      }
    }

    // allElements에 모은 모든 element를 하나의 객체로
    return mergeArrayObjectToOneObject(allElements);
  }

  attachEvent(eventObject) {
    entryObject(eventObject).forEach(([name, [eventType, eventCallback]]) => {
      this.elements[name].addEventListener(eventType, eventCallback);
    });
  }
}
