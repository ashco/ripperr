import styled from 'styled-components';

import { sizes } from '@/styles/sizes';
import { MovementType } from '@/types/enums';

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
    /* padding: 1rem; */
    /* max-width: 100vw; */
    /* width: 100%;
    max-width: 100vw; */
    /* max-width: ${(props) =>
      props.type === MovementType.Workout ? '48rem' : '32rem'}; */
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
      /* padding: 2rem; */
      /* width: ${(props) =>
        props.type === MovementType.Workout ? '48rem' : '32rem'}; */
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
