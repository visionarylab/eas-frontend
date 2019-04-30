import { SET_HOSTNAME } from './types';

// eslint-disable-next-line import/prefer-default-export
export const setHostname = hostname => dispatch => {
  dispatch({ type: SET_HOSTNAME, payload: hostname });
};
