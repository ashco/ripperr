import styled from 'styled-components';
import { sizes } from 'styles/sizes';

const ModalContainer = styled.div<{ width?: string }>`
  display: grid;
  gap: 1rem;
  background: ${(p) => p.theme.mode.background[300]};
  padding: 1rem;
  color: ${(p) => p.theme.mode.color[100]};
  box-shadow: ${(p) => p.theme.shadow[2]};
  /* max-width: ${(p) => p.width || 'auto'}; */
  width: 100vw;
  max-width: ${(p) => p.width};
  h1.header {
    font-size: 22px;
    font-weight: 600;
  }

  @media (min-width: ${sizes.tablet}) {
    padding: 2rem;
    width: ${(p) => p.width};
    h1.header {
      font-size: 24px;
    }
  }
`;

export default ModalContainer;
