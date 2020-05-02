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
  @media (min-width: ${sizes.tablet}) {
    padding: 2rem;
  }

  .container {
    display: grid;
    gap: 1rem;
  }
  /*
  input,
  textarea {
    border: none;
    border-bottom: 2px solid ${(props) => props.theme.mode.color[100]};
    background: none;
    color: ${(props) => props.theme.mode.color[100]};
  }
  input:disabled,
  textarea:disabled {
    border-color: ${(props) => props.theme.mode.color[200]};
  }
  input {
    font-size: 20px;
  }
  textarea {
    font-size: 16px;
  } */
`;

export default ModalWrapper;
