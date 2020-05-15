import {
  FilterState,
  FilterActionTypes,
  FILTER_ON,
  FILTER_OFF,
  FILTER_RESET,
  FILTER_UPDATE_VALUE,
  FILTER_TOGGLE_TAG,
} from './types';

const initialState: FilterState = {
  active: false,
  value: '',
  tags: [],
};

export function filterReducer(
  state = initialState,
  action: FilterActionTypes,
): FilterState {
  switch (action.type) {
    case FILTER_ON:
      return {
        ...state,
        active: true,
      };
    case FILTER_OFF:
      return {
        ...state,
        active: false,
      };
    case FILTER_RESET:
      return { ...initialState, tags: [] };
    case FILTER_UPDATE_VALUE:
      return {
        ...state,
        value: action.payload,
      };
    case FILTER_TOGGLE_TAG: {
      const { tags } = state;
      const index = tags.indexOf(action.payload);
      index > -1 ? tags.splice(index, 1) : tags.push(action.payload);
      return {
        ...state,
        tags,
      };
    }
    default:
      return state;
  }
}
