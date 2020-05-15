import React from 'react';
import { useSelector, useDispatch } from 'store';
import styled from 'styled-components';

// import { useModalState, useModalDispatch } from 'context/ModalContext';

import { ModalMode } from 'types/enums';

const ModalBackground: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state);
  // const modal = useModalState();
  // const modalDispatch = useModalDispatch();

  const bgRef = React.useRef<HTMLDivElement>(null);

  function handleClose(e: any): void {
    if (e.target === bgRef.current) {
      if (modal.mode !== ModalMode.Edit) {
        dispatch({ type: 'MODAL_CLOSE' });
      }
    }
  }

  React.useEffect(() => {
    document.addEventListener('click', handleClose);

    return (): void => document.removeEventListener('click', handleClose);
  });

  return <StyledModalBackground ref={bgRef}>{children}</StyledModalBackground>;
};

const StyledModalBackground = styled.div`
  z-index: 900;
  background-color: ${(props) => props.theme.mode.backgroundOpacity[100]};
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  align-content: center;
  justify-content: center;
`;

export default ModalBackground;
