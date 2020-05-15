import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DefaultTheme } from 'styled-components';
import { lightTheme, darkTheme } from 'styles/theme';

interface ThemeMode {
  themeMode: 'LIGHT' | 'DARK';
}

type ModalMode = 'ADD' | 'EDIT' | 'VIEW' | 'DELETE' | null;
export type isAddMoveMode = boolean;

interface UIState {
  theme: DefaultTheme;
  modalMode: ModalMode;
  isAddMoveMode: isAddMoveMode;
}

const initialState: UIState = {
  theme: darkTheme,
  modalMode: null,
  isAddMoveMode: false,
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
    setIsAddMoveMode(state, action: PayloadAction<isAddMoveMode>) {
      state.isAddMoveMode = action.payload;
    },
  },
});

export const { setTheme, setModalMode, setIsAddMoveMode } = uiSlice.actions;

export default uiSlice.reducer;
