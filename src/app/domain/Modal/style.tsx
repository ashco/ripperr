﻿import styled from 'styled-components';

const ModalRoot = styled.div`
  position: relative;
  z-index: 999;
  .background {
    background-color: ${(props) => props.theme.mode.backgroundOpacity[100]};
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: grid;
    align-content: center;
    justify-content: center;
  }
  .modal-wrapper {
    overflow-y: auto;
    > div {
      margin: 2rem 1rem;
    }
  }
`;

export default ModalRoot;
