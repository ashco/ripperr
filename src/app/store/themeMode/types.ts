import { DefaultTheme } from 'styled-components';

// Describing the shape of the system's slice of state
// export interface ThemeModeState {
//   themeMode: DefaultTheme;
// }
export type ThemeModeState = DefaultTheme;

// Describing the different ACTION NAMES available
// export const UPDATE_THEME_MODE = 'LIGHT_MODE' | 'DARK_MODE';

export type THEME_MODE = 'LIGHT_MODE' | 'DARK_MODE';

export interface ThemeModeAction {
  type: THEME_MODE;
  // payload: ThemeModeState;
}

// export type ThemeModeActionTypes = UpdateThemeModeAction;

// // Describing the shape of the system's slice of state
// export interface SystemState {
//   loggedIn: boolean;
//   session: string;
//   userName: string;
// }

// // Describing the different ACTION NAMES available
// export const UPDATE_SESSION = "UPDATE_SESSION";

// interface UpdateSessionAction {
//   type: typeof UPDATE_SESSION;
//   payload: SystemState;
// }

// export type SystemActionTypes = UpdateSessionAction;
