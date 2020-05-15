import { ModalMode } from 'types/enums';

export interface ModalState {
  open: boolean;
  mode: ModalMode | null;
}

export const MODAL_ADD = 'MODAL_ADD';
export const MODAL_VIEW = 'MODAL_VIEW';
export const MODAL_EDIT = 'MODAL_EDIT';
export const MODAL_DELETE = 'MODAL_DELETE';
export const MODAL_CLOSE = 'MODAL_CLOSE';

interface ModalAddAction {
  type: typeof MODAL_ADD;
}

interface ModalViewAction {
  type: typeof MODAL_VIEW;
}

interface ModalEditAction {
  type: typeof MODAL_EDIT;
}

interface ModalDeleteAction {
  type: typeof MODAL_DELETE;
}

interface ModalCloseAction {
  type: typeof MODAL_CLOSE;
}

export type ModalActionTypes =
  | ModalAddAction
  | ModalViewAction
  | ModalEditAction
  | ModalDeleteAction
  | ModalCloseAction;
