import styled from 'styled-components';

const StyledColorBarWrapper = styled.div<{
  color: string;
  height?: string;
  width?: string;
}>`
  display: grid;
  grid-template-rows: ${(props) => (props.height ? props.height : '8px')} auto;
  .color-bar {
    width: ${(props) => (props.width ? props.width : '90%')};
    margin: 0 auto;
    background: ${(props) => props.color};
  }
`;

export default StyledColorBarWrapper;
