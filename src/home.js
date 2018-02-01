import welcome from './welcome';

if(NODE_ENV === 'development'){
  alert(1);
}

welcome('home');

export { welcome };