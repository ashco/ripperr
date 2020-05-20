import styled from 'styled-components';

interface Props {
  className?: string;
  color: string;
  barHeight: string;
  onClick?: (e: any) => void;
}

const StyledColorBarWrapper = styled.div<Props>`
  display: grid;
  grid-template-rows: ${(p) => p.barHeight} auto;
  max-width: 90vw;
  .color-bar {
    width: 90%;
    margin: 0 auto;
    background: ${(p) => p.color};
  }
`;

export default StyledColorBarWrapper;
