import { THEME } from './types';

export function updateTheme(theme: THEME) {
  return {
    type: theme,
  };
}
