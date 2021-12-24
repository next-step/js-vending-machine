import Controller from './controllers/controller.js';
import Model from './model.js';

// window.onerror = function (msg) {
//   alert(msg.replace('Uncaught Error: ', ''));
//   return true;
// };

new Controller(new Model());
