import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { ModalBackground, ModalWrapper } from '../Modal';

const NewModal: React.FC = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <ModalRoot>
      {modalOpen && (
        <ModalBackground>
          <ModalWrapper>hi there</ModalWrapper>
        </ModalBackground>
      )}
      {/* <ModalBackground>{props.children}</ModalBackground> */}
    </ModalRoot>
  );
};

const ModalRoot = styled.div`
  position: relative;
  z-index: 999;
`;

export default NewModal;
