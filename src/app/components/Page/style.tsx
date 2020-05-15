import styled from 'styled-components';

const StyledPage = styled.div<{ disablePointer?: boolean }>`
  color: ${({ theme }) => theme.color.neutral[900]};
  background: ${(props) => props.theme.mode.background[100]};
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 4rem 1fr;
  grid-template-areas:
    'navigation'
    'main';

  pointer-events: ${(p) => (p.disablePointer ? 'none' : 'auto')};
  .main {
    grid-area: main;
    overflow-y: auto;
  }
`;

export default StyledPage;
