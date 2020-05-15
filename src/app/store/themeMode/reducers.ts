import { lightTheme, darkTheme } from 'styles/theme';

import { ThemeModeState, ThemeModeAction } from './types';

const initialState: ThemeModeState = darkTheme;

export function themeModeReducer(
  state = initialState,
  action: ThemeModeAction,
): ThemeModeState {
  switch (action.type) {
    case 'LIGHT_MODE': {
      return lightTheme;
    }
    case 'DARK_MODE': {
      return darkTheme;
    }
    default:
      return state;
  }
}
