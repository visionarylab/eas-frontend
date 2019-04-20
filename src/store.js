/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import createRootReducer from './reducers';
import config from './config/config';

const { isServer } = config;

export default (url = '/') => {
  // Create a history depending on server or client
  const history = isServer
    ? createMemoryHistory({
        initialEntries: [url],
      })
    : createBrowserHistory();

  const enhancers = [];

  // Add dev tools
  if (process.env.NODE_ENV === 'development' && !isServer) {
    // eslint-disable-next-line prefer-destructuring
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const middleware = [thunk, routerMiddleware(history)];
  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers,
  );

  // Do we have preloaded state available? save it.
  const initialState = !isServer ? window.__PRELOADED_STATE__ : {};

  // Delete it once we have it stored in a variable
  if (!isServer) {
    delete window.__PRELOADED_STATE__;
  }

  // Create the store
  const store = createStore(createRootReducer(history), initialState, composedEnhancers);

  return {
    store,
    history,
  };
};
