import { SET_HOSTNAME } from '../actions/types';

const initialState = {
  hostname: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_HOSTNAME:
      return { ...state, hostname: action.payload };
    default:
      return state;
  }
}
