import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Active = boolean;
type FilterValue = string;
type Tags = string[];

export interface FilterState {
  active: Active;
  value: FilterValue;
  tags: Tags;
}

interface ToggleFilter {
  active: boolean;
}

const initialState: FilterState = {
  active: false,
  value: '',
  tags: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggleFilter(state, action: PayloadAction<ToggleFilter>) {
      state.active = action.payload.active;
    },
    setFilterValue(state, action: PayloadAction<FilterValue>) {
      state.value = action.payload;
    },
    resetFilter(state) {
      state = initialState;
    },
    toggleFilterTag(state, action: PayloadAction<string>) {
      const newTags = [...state.tags];
      const index = newTags.indexOf(action.payload);
      index > -1 ? newTags.splice(index, 1) : newTags.push(action.payload);
      state.tags = newTags;
    },
  },
});

export const {
  toggleFilter,
  setFilterValue,
  resetFilter,
  toggleFilterTag,
} = filterSlice.actions;

export default filterSlice.reducer;
