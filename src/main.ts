import controller from './ts/controller';
import router from './ts/router/router';

const init = () => {
  router();
  controller();
};

init();
