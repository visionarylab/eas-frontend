import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import drawReducers from './drawReducers';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    draws: drawReducers,
  });

export default createRootReducer;
