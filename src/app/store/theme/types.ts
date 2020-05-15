import { DefaultTheme } from 'styled-components';

export type ThemeState = DefaultTheme;

export type ThemeActionType = 'theme/update';
export type ThemeActionPayload = 'light' | 'dark';

export interface ThemeAction {
  type: ThemeActionType;
  payload: ThemeActionPayload;
}
