import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DefaultTheme } from 'styled-components';
import { lightTheme, darkTheme } from 'styles/theme';

type ThemeMode = {
  themeMode: 'LIGHT' | 'DARK';
};

interface ModalMode {
  modalMode: 'ADD' | 'EDIT' | 'VIEW' | 'DELETE' | null;
}

interface UIState extends ModalMode {
  theme: DefaultTheme;
}

const initialState: UIState = {
  theme: darkTheme,
  modalMode: null,
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
      const { modalMode } = action.payload;
      state.modalMode = modalMode;
    },
  },
});

export const { setTheme, setModalMode } = uiSlice.actions;

export default uiSlice.reducer;
