import styled from 'styled-components';

import { sizes } from 'styles/sizes';

// DELETE ME
const ModalRoot = styled.div<{ modalWidth?: string }>`
  position: relative;
  z-index: 999;
  .background {
    background-color: ${(p) => p.theme.mode.backgroundOpacity[100]};
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
      max-width: ${(p) => p.modalWidth || 'auto'};
    }

    .modal-container {
      display: grid;
      gap: 1rem;
      background: ${(p) => p.theme.mode.background[300]};

      padding: 1rem;
      color: ${(p) => p.theme.mode.color[100]};
      box-shadow: ${(p) => p.theme.shadow[2]};
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
        width: ${(p) => p.modalWidth || 'auto'};
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
