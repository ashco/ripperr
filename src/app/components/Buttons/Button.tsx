import styled from 'styled-components';

const Button = styled.button<{ size?: string }>`
  border: 2px solid black;
  font-size: ${(props) => props.size || '16px'};
  padding: 0.5rem;
  width: 100%;
  cursor: pointer;
  &:hover {
    background: lightgray;
  }
  &:active {
    background: gray;
  }
`;

export default Button;
