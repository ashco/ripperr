import React from 'react';
import { useSelector, useDispatch, batch } from 'store';
import { setModalMode } from 'store/ui';
import { clearActiveMove } from 'store/moves';
import styled from 'styled-components';

const ModalBackground: React.FC<{ isHidden?: boolean }> = ({
  isHidden,
  children,
}) => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.ui);

  const bgRef = React.useRef<HTMLDivElement>(null);

  function handleClose(e: any): void {
    if (e.target === bgRef.current) {
      if (modal.modalMode !== 'EDIT') {
        batch(() => {
          dispatch(setModalMode({ modalMode: null }));
          // dispatch(clearActiveMove());
        });
      }
    }
  }

  React.useEffect(() => {
    document.addEventListener('click', handleClose);

    return (): void => document.removeEventListener('click', handleClose);
  });

  return (
    <StyledModalBackground isHidden={isHidden} ref={bgRef}>
      {children}
    </StyledModalBackground>
  );
};

const StyledModalBackground = styled.div<{ isHidden?: boolean }>`
  z-index: 100;
  background-color: ${(props) => props.theme.mode.backgroundOpacity[100]};
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: ${(p) => (p.isHidden ? 'none' : 'grid')};
  align-content: center;
  justify-content: center;
`;

export default ModalBackground;
