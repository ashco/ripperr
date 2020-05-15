import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DefaultTheme } from 'styled-components';
import { lightTheme, darkTheme } from 'styles/theme';

export type ThemeState = DefaultTheme;
const initialState: ThemeState = darkTheme;

type ThemeMode = {
  themeMode: 'LIGHT' | 'DARK';
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    updateTheme: function (state, action: PayloadAction<ThemeMode>) {
      const { themeMode } = action.payload;
      if (themeMode === 'LIGHT') {
        return lightTheme;
      } else if (themeMode === 'DARK') {
        return darkTheme;
      }
    },
  },
});

export const { updateTheme } = themeSlice.actions;

export default themeSlice.reducer;
// export type ThemeActionType = 'theme/update';
// export type ThemeActionPayload = 'light' | 'dark';

// export interface ThemeAction {
//   type: ThemeActionType;
//   payload: ThemeActionPayload;
// }

// export const ThemeModes = {
//   DARK_MODE: 'DARK_MODE',
//   LIGHT_MODE: 'LIGHT_MODE',
// };

// const updateTheme = createAction('theme/update');
// const updateThemeLight = createAction('LIGHT_MODE');
// const updateThemeDark = createAction('DARK_MODE');

// export const themeReducer = createReducer(initialState, {
//   // can also just call [updateTheme] because it will convert to string, and it's .toString method returns the action type
//   [updateThemeLight.type]: () => lightTheme,
//   [updateThemeDark.type]: () => darkTheme,
// });

// export function updateTheme(theme: ThemeActionType) {
//   return {
//     type: theme,
//   };
// }

// export function themeReducer(
//   state = initialState,
//   action: ThemeAction,
// ): ThemeState {
//   switch (action.type) {
//     case 'LIGHT_MODE': {
//       return lightTheme;
//     }
//     case 'DARK_MODE': {
//       return darkTheme;
//     }
//     default:
//       return state;
//   }
// }
