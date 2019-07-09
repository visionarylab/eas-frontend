import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import drawReducers from './drawReducers';
import footerReducers from './footerReducers';
import userRequestReducers from './userRequestReducers';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    draws: drawReducers,
    footer: footerReducers,
    userRequest: userRequestReducers,
  });

export default createRootReducer;
