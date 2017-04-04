import { CLEAR_STORE } from './actions.jsx';

const initialState = [];

//the reducers should remain pure
export function reduce(state = initialState, action) {
  switch(action.type) {
    case CLEAR_STORE:
      return initialState;

    default:
      return state;
  }
}
