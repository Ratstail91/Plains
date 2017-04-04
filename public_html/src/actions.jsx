export const CLEAR_STORE = 'CLEAR_STORE';
export const SET_SCREEN = 'SET_SCREEN';

export const SCREEN_LANDING = 'SCREEN_LANDING';
export const SCREEN_MAP = 'SCREEN_MAP';
export const SCREEN_PROFILE = 'SCREEN_PROFILE';

export function setScreen(screen) {
  return {
    type: SET_SCREEN,
    screen: screen
  };
}

export function clearStore() {
  return {
    type: CLEAR_STORE
  };
}
