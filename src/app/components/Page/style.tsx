import styled from 'styled-components';

const StyledPage = styled.div<{ pointerEvents: string }>`
  color: ${({ theme }) => theme.color.neutral[900]};
  background: ${(props) => props.theme.mode.background[100]};
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 4rem 1fr;
  grid-template-areas:
    'navigation'
    'main';
  border-top: 7px solid ${(props) => props.theme.color.logo};
  pointer-events: ${(props) => (props.pointerEvents ? 'auto' : 'none')};
  .main {
    grid-area: main;
    overflow-y: auto;
  }
`;

export default StyledPage;
