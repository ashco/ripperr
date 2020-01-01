import { ModalNodeAttatcher, ModalBackground } from '../Modal';

const Modal = (props: any) => (
  <ModalNodeAttatcher>
    <ModalBackground>{props.children}</ModalBackground>
  </ModalNodeAttatcher>
);

export default Modal;
