import { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Modal = (props: any) => {
  let modalRoot: any;
  let el: any;
  if (window !== undefined) {
    modalRoot = document.getElementById('modal-root');
    el = document.createElement('div');
  }

  useEffect(() => {
    if (modalRoot) {
      modalRoot.appendChild(el);
    }

    return (): void => {
      if (modalRoot) {
        modalRoot.removeChild(el);
      }
    };
  });

  // Use a portal to render the children into the element
  return ReactDOM.createPortal(
    // Any valid React child: JSX, strings, arrays, etc.
    props.children,
    // A DOM element
    el,
  );
};

export default Modal;
