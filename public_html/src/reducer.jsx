import { CLEAR_STORE, SET_SCREEN, SET_DETAILS } from './actions.jsx';

const initialState = {};

//the reducers should remain pure
export function reduce(state = initialState, action) {
  let nextState = JSON.parse(JSON.stringify(state));

  switch(action.type) {
    case SET_SCREEN:
      nextState.screen = action.screen;
      return nextState;

    case SET_DETAILS:
      nextState.email = action.email;
      nextState.coins = action.coins;
      nextState.jewels = action.jewels;
      return nextState;

    case CLEAR_STORE:
      return initialState;

    default:
      return nextState;
  }
}
