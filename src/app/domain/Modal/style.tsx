import styled from 'styled-components';

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
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default ModalRoot;
