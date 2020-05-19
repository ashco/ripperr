import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DefaultTheme } from 'styled-components';
import { lightTheme, darkTheme } from 'styles/theme';

import { MovementType } from 'types/types';

interface ThemeMode {
  themeMode: 'LIGHT' | 'DARK';
}

// type ModalMode = 'ADD' | 'EDIT' | 'VIEW' | 'DELETE' | 'CLOSED';
type ActiveMoveType = MovementType | null;
export type ModalMode = 'ADD' | 'EDIT' | 'VIEW' | 'DELETE' | 'CLOSED';
export type IsAddMoveMode = boolean;
export type IsPointerDisabled = boolean;

interface SetModalMode {
  // activeMoveType?: ActiveMoveType;
  modalMode: ModalMode;
}

interface UIState {
  theme: DefaultTheme;
  // activeMoveType: ActiveMoveType;
  modalMode: ModalMode;
  isAddMoveMode: IsAddMoveMode;
  isPointerDisabled: IsPointerDisabled;
}

const initialState: UIState = {
  theme: darkTheme,
  //
  modalMode: 'CLOSED',
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
