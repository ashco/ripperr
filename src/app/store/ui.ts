import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DefaultTheme } from 'styled-components';

import { lightTheme, darkTheme } from 'styles/theme';

import { ModalMode, ThemeModeType } from 'types';

interface ThemeMode {
  themeMode: ThemeModeType;
}

export type IsAddMoveMode = boolean;
export type IsPointerDisabled = boolean;

interface SetModalMode {
  // activeMoveType?: ActiveMoveType;
  modalMode: ModalMode | null;
}

interface UIState {
  theme: DefaultTheme;
  modalMode: ModalMode | null;
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

      state.theme = themeMode === 'LIGHT' ? lightTheme : darkTheme;

      localStorage.setItem('theme', themeMode);
    },

    setModalMode(state, action: PayloadAction<SetModalMode>) {
      state.modalMode = action.payload.modalMode;
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
