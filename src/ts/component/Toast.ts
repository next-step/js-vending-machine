export default class Toast extends HTMLElement{
  constructor() {
    super();
  }
    
  connectedCallback() {
    this.render();       
  }
    
  private render() {
    this.innerHTML = /* html */ '<div id="toasts"></div>';
  }
}
