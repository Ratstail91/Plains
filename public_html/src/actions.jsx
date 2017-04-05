export const CLEAR_STORE = 'CLEAR_STORE';
export const SET_SCREEN = 'SET_SCREEN';
export const SET_DETAILS = 'SET_DETAILS';

export const SCREEN_LANDING = 'SCREEN_LANDING';
export const SCREEN_MAP = 'SCREEN_MAP';
export const SCREEN_PROFILE = 'SCREEN_PROFILE';
export const SCREEN_SIGNUP = 'SCREEN_SIGNUP';

export function setScreen(screen) {
  return {
    type: SET_SCREEN,
    screen: screen
  };
}

export function setDetails(email, coins, jewels) {
  return {
    type: SET_DETAILS,
    email: email,
    coins: coins,
    jewels: jewels
  };
}

export function clearStore() {
  return {
    type: CLEAR_STORE
  };
}
