import {
  MODAL_ADD,
  MODAL_VIEW,
  MODAL_EDIT,
  MODAL_DELETE,
  MODAL_CLOSE,
  ModalActionTypes,
} from './types';

export function modalAdd(): ModalActionTypes {
  return {
    type: MODAL_ADD,
  };
}

export function modalView(): ModalActionTypes {
  return {
    type: MODAL_VIEW,
  };
}

export function modalEdit(): ModalActionTypes {
  return {
    type: MODAL_EDIT,
  };
}

export function modalDelete(): ModalActionTypes {
  return {
    type: MODAL_DELETE,
  };
}

export function modalClose(): ModalActionTypes {
  return {
    type: MODAL_CLOSE,
  };
}
