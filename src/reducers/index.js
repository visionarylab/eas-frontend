import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import drawReducers from './drawReducers';
import hostnameReducers from './hostnameReducers';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    draws: drawReducers,
    hostname: hostnameReducers,
  });

export default createRootReducer;
