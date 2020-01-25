import styled from 'styled-components';

const Button = styled.button<{ size?: string }>`
  border: 2px solid black;
  font-size: ${(props) => props.size || '1.5rem'};
  margin: 0.25rem 0;
  padding: 0.5rem;
  width: 100%;
  cursor: pointer;
  &:hover {
    background: grey;
  }
`;

export default Button;
