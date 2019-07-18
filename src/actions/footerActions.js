import { SHOW_FOOTER, HIDE_FOOTER } from './types';

export const showFooter = () => dispatch => {
  dispatch({ type: SHOW_FOOTER });
};

export const hideFooter = () => dispatch => {
  dispatch({ type: HIDE_FOOTER });
};
