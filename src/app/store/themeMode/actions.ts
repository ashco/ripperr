import { THEME_MODE } from './types';

export function updateThemeMode(themeMode: THEME_MODE) {
  return {
    // type: UPDATE_SESSION,
    type: themeMode,
  };
}
// export function updateThemeMode(themeMode: THEME_MODE) {
//   return {
//     // type: UPDATE_SESSION,
//     type: themeMode,
//   };
// }
// export function updateThemeMode(newSession: SystemState) {
//   return {
//     type: UPDATE_SESSION,
//     payload: newSession,
//   };
// }
