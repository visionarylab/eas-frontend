import { SHOW_FOOTER, HIDE_FOOTER } from '../actions/types';

const initialState = {
  visible: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_FOOTER:
      return { ...state, visible: true };
    case HIDE_FOOTER:
      return { ...state, visible: false };
    default:
      return state;
  }
}
