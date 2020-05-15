import styled from 'styled-components';

import { sizes } from 'styles/sizes';
import { MovementType } from 'types/enums';

// DELETE ME
const ModalRoot = styled.div<{ type?: MovementType; modalWidth?: string }>`
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
  .wrapper {
    overflow-y: auto;
    > div {
      padding: 1rem;
      width: 100vw;
      max-width: ${(props) => props.modalWidth || 'auto'};
    }

    .modal-container {
      display: grid;
      gap: 1rem;
      background: ${(props) => props.theme.mode.background[300]};

      padding: 1rem;
      color: ${(props) => props.theme.mode.color[100]};
      box-shadow: ${(props) => props.theme.shadow[2]};
      h1.header {
        font-size: 22px;
        font-weight: 600;
      }
    }
  }

  @media (min-width: ${sizes.tablet}) {
    .wrapper {
      > div {
        padding: 2rem;
        width: ${(props) => props.modalWidth || 'auto'};
      }
      .modal-container {
        padding: 2rem;
        h1.header {
          font-size: 24px;
        }
      }
    }
  }
`;

export default ModalRoot;
