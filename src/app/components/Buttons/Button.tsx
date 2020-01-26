import styled from 'styled-components';

const Button = styled.button<{ size?: string }>`
  border: 2px solid black;
  font-size: ${(p) => p.size || p.theme.font[2]};
  /* margin: 0.25rem 0; */
  padding: 0.5rem;
  /* width: 100%; */
  cursor: pointer;
  &:hover {
    background: lightgray;
  }
  &:active {
    background: gray;
  }
`;

export default Button;
