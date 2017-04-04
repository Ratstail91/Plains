import { CLEAR_STORE, SET_SCREEN } from './actions.jsx';

const initialState = {};

//the reducers should remain pure
export function reduce(state = initialState, action) {
  switch(action.type) {
    case SET_SCREEN:
      let nextState = JSON.parse(JSON.stringify(state));
      nextState.screen = action.screen;
      return nextState;

    case CLEAR_STORE:
      return initialState;

    default:
      return state;
  }
}
