import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DefaultTheme } from 'styled-components';
import { lightTheme, darkTheme } from 'styles/theme';

interface ThemeMode {
  themeMode: 'LIGHT' | 'DARK';
}

type ModalMode = 'ADD' | 'EDIT' | 'VIEW' | 'DELETE' | null;
export type IsAddMoveMode = boolean;
export type IsPointerDisabled = boolean;

interface UIState {
  theme: DefaultTheme;
  modalMode: ModalMode;
  isAddMoveMode: IsAddMoveMode;
  isPointerDisabled: IsPointerDisabled;
}

const initialState: UIState = {
  theme: darkTheme,
  modalMode: null,
  isAddMoveMode: false,
  isPointerDisabled: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      const { themeMode } = action.payload;
      if (themeMode === 'LIGHT') {
        state.theme = lightTheme;
      } else if (themeMode === 'DARK') {
        state.theme = darkTheme;
      }
    },

    setModalMode(state, action: PayloadAction<ModalMode>) {
      state.modalMode = action.payload;
    },

    setIsAddMoveMode(state, action: PayloadAction<IsAddMoveMode>) {
      state.isAddMoveMode = action.payload;
    },

    setIsPointerDisabled(state, action: PayloadAction<IsPointerDisabled>) {
      state.isPointerDisabled = action.payload;
    },
  },
});

export const {
  setTheme,
  setModalMode,
  setIsAddMoveMode,
  setIsPointerDisabled,
} = uiSlice.actions;

export default uiSlice.reducer;
