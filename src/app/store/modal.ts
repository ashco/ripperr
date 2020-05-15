import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  modalMode:
    | 'MODAL_ADD'
    | 'MODAL_EDIT'
    | 'MODAL_VIEW'
    | 'MODAL_DELETE'
    | 'MODAL_CLOSED';
}

const initialState: ModalState = {
  modalMode: 'MODAL_CLOSED',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalMode(state, action: PayloadAction<ModalState>) {
      const { modalMode } = action.payload;
      state.modalMode = modalMode;
    },
  },
});

export const { setModalMode } = modalSlice.actions;

export default modalSlice.reducer;
