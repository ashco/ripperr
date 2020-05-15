import React from 'react';
import ReactDOM from 'react-dom';

const Portal: React.FC = ({ children }) => {
  let modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  }

  const el = React.useRef(document.createElement('div'));
  React.useLayoutEffect((): any => {
    const currentEl = el.current;
    (modalRoot as HTMLElement).appendChild(currentEl);
    return () => (modalRoot as HTMLElement).removeChild(currentEl);
  }, []);

  return ReactDOM.createPortal(children, el.current);
};

const ModalWrapper: React.FC<{ isOpen: boolean }> = ({ isOpen, children }) => {
  return isOpen ? <Portal>{children}</Portal> : null;
};

export default ModalWrapper;
