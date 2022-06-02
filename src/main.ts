import Router from './ts/router/router';
import Component from './ts/component/index';
import { isPredicatedElement } from './ts/utils/predicator';

class App {
  constructor(router = Router, component = Component) { 
    this.render();
    component();
    router(); 
  }

  private get template() {
    return /* html */ `
    <nav-component></nav-component>
    <div id="app"></div>
    <toast-component></toast-component>
    `;
  }

  private render() {
    const body = document.querySelector('body');      
    const newDom = document.createRange().createContextualFragment(this.template);
  
    if (!isPredicatedElement(body)) {
      throw new Error('Dom content is not loaded');
    }
    body.replaceChildren(newDom);
  }
}

new App();

