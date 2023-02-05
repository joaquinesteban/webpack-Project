import Template from '@templates/Template.js';
import '@styles/main.scss'
console.log('Hola Mundo!!');

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();

