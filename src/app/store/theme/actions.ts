import { createAction } from '@reduxjs/toolkit';

import { ThemeActionType, ThemeActionPayload } from './types';

export const updateTheme = createAction('theme/update');

// export function updateTheme(theme: ThemeActionType) {
//   return {
//     type: theme,
//   };
// }
