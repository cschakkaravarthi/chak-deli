import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './shared/reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// TODO: using any for now, it seems like a type was not set here since the beginning
export default (initialState = {}): any => {
  const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose) || compose;
  const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunkMiddleware)));

  return store;
};
