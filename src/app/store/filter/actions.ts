import {
  FILTER_ON,
  FILTER_OFF,
  FILTER_RESET,
  FILTER_UPDATE_VALUE,
  FILTER_TOGGLE_TAG,
  FilterActionTypes,
} from './types';

export function filterOn(): FilterActionTypes {
  return {
    type: FILTER_ON,
  };
}

export function filterOff(): FilterActionTypes {
  return {
    type: FILTER_OFF,
  };
}

export function filterReset(): FilterActionTypes {
  return {
    type: FILTER_RESET,
  };
}

export function filterUpdateValue(text: string): FilterActionTypes {
  return {
    type: FILTER_UPDATE_VALUE,
    payload: text,
  };
}

export function filterToggleTag(moveId: string): FilterActionTypes {
  return {
    type: FILTER_TOGGLE_TAG,
    payload: moveId,
  };
}
