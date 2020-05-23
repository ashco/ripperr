import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from 'types';

interface ToggleFilter {
  open: boolean;
}

const initialState: FilterState = {
  active: false,
  open: false,
  tags: [],
  value: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    showFilter(state, action: PayloadAction<ToggleFilter>) {
      state.open = action.payload.open;
    },

    setFilterValue(state, action: PayloadAction<string>) {
      state.value = action.payload;

      state.active = state.tags.length > 0 || state.value.length > 0;
    },

    resetFilter(state) {
      state.active = false;
      state.open = false;
      state.tags = [];
      state.value = '';
    },

    toggleFilterTag(state, action: PayloadAction<string>) {
      const newTags = [...state.tags];
      const index = newTags.indexOf(action.payload);
      index > -1 ? newTags.splice(index, 1) : newTags.push(action.payload);
      state.tags = newTags;

      state.active = state.tags.length > 0 || state.value.length > 0;
    },
  },
});

export const {
  showFilter,
  setFilterValue,
  resetFilter,
  toggleFilterTag,
} = filterSlice.actions;

export default filterSlice.reducer;
