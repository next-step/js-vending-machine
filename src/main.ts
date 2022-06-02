import Router from './ts/router/router';
import Component from './ts/component/index';
import { isPredicatedElement } from './ts/utils/predicator';

class App {
  constructor(router = Router, component = Component) { 
    const body = document.querySelector('body');      
    const template = /* html */ `
    <nav-component></nav-component>
    <div id="app"></div>
    `;

    const newDom = document.createRange().createContextualFragment(template);
    
    if (!isPredicatedElement(body)) {
      throw new Error('Dom content is not loaded');
    }
  
    body.replaceChildren(newDom);
  
    component();
    router(); 
  }
}

new App();

