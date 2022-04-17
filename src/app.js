import '../index.css';
import Header from './components/Header';
import Main from './components/Main';
import router from './router';

const app = document.querySelector('#app');

Header(app);
Main(app);

router();
