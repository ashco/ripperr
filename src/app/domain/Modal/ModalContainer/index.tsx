import styled from 'styled-components';

const ModalContainer = styled.div`
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
`;

export default ModalContainer;
