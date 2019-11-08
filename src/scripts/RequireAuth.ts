import store from '../store';

export default (to: any, from: any, next: any) => {
  console.log('to', to, 'from', from);
  if (store.getters.getUserLoggedStatus) {
    next();
  } else {
    console.log('nop');
    next('/login');
  }
};
