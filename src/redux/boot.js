import { store } from './store';
import  actions  from './auth/actions';

export default () =>
  new Promise(() => {
    store.dispatch(actions.checkAuthorization());
  });
