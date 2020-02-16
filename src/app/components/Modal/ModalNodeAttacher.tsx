import { useEffect } from 'react';
import ReactDOM from 'react-dom';

const ModalNodeAttacher = (props: any) => {
  let modalRoot: any;
  let modalEl: any;
  if (window !== undefined) {
    modalRoot = document.getElementById('modal-root');
    modalEl = document.createElement('div');
  }

  useEffect(() => {
    if (modalRoot) {
      modalRoot.appendChild(modalEl);
    }

    return (): void => {
      if (modalRoot) {
        modalRoot.removeChild(modalEl);
      }
    };
  });

  // Use a portal to render the children into the element
  return ReactDOM.createPortal(
    // Any valid React child: JSX, strings, arrays, etc.
    props.children,
    // A DOM element
    modalEl,
  );
};

export default ModalNodeAttacher;
