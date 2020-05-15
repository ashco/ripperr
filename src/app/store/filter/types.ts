export interface FilterState {
  active: boolean;
  value: string;
  tags: string[];
}

export const FILTER_ON = 'FILTER_ON';
export const FILTER_OFF = 'FILTER_OFF';
export const FILTER_RESET = 'FILTER_RESET';
export const FILTER_UPDATE_VALUE = 'FILTER_UPDATE_VALUE';
export const FILTER_TOGGLE_TAG = 'FILTER_TOGGLE_TAG';

interface FilterOnAction {
  type: typeof FILTER_ON;
}

interface FilterOffAction {
  type: typeof FILTER_OFF;
}

interface FilterResetAction {
  type: typeof FILTER_RESET;
}

interface FilterUpdateValueAction {
  type: typeof FILTER_UPDATE_VALUE;
  payload: string;
}

interface FilterToggleTagAction {
  type: typeof FILTER_TOGGLE_TAG;
  payload: string;
}

export type FilterActionTypes =
  | FilterOnAction
  | FilterOffAction
  | FilterResetAction
  | FilterUpdateValueAction
  | FilterToggleTagAction;
