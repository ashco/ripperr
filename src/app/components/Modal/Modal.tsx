import { ModalNodeAttacher, ModalBackground } from '../Modal';

const Modal = (props: any) => (
  <ModalNodeAttacher>
    <ModalBackground>{props.children}</ModalBackground>
  </ModalNodeAttacher>
);

export default Modal;
