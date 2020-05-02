import styled from 'styled-components';

import { sizes } from '@/styles/sizes';

const ModalWrapper = styled.div`
  display: grid;
  gap: 1rem;
  background: ${(props) => props.theme.mode.background[300]};
  max-width: 90vw;
  padding: 1rem;
  color: ${(props) => props.theme.mode.color[100]};
  box-shadow: ${(props) => props.theme.shadow[2]};
  /* .container {
    display: grid;
    gap: 1rem;
  } */
  @media (min-width: ${sizes.tablet}) {
    padding: 2rem;
  }
`;

export default ModalWrapper;
