﻿import { createReducer } from '@reduxjs/toolkit';

import { lightTheme, darkTheme } from 'styles/theme';

import { ThemeState, ThemeAction } from './types';

const initialState: ThemeState = darkTheme;

const themeReducer = createReducer(initialState, {});

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
