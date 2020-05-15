import {
  ModalState,
  ModalActionTypes,
  MODAL_ADD,
  MODAL_VIEW,
  MODAL_EDIT,
  MODAL_DELETE,
  MODAL_CLOSE,
} from './types';
import { ModalMode } from 'types/enums';

const initialState: ModalState = {
  open: false,
  mode: null,
};

export function modalReducer(
  state = initialState,
  action: ModalActionTypes,
): ModalState {
  switch (action.type) {
    case MODAL_ADD:
      return { open: true, mode: ModalMode.Add };
    case MODAL_VIEW:
      return { open: true, mode: ModalMode.View };
    case MODAL_EDIT:
      return { open: true, mode: ModalMode.Edit };
    case MODAL_DELETE:
      return { open: true, mode: ModalMode.Delete };
    case MODAL_CLOSE:
      return { open: false, mode: null };
    default:
      return state;
  }
}
