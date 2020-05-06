import styled from 'styled-components';

const Button = styled.button`
  border: 2px solid ${(props) => props.theme.mode.color[100]};
  color: ${(props) => props.theme.mode.color[100]};
  background: none;
  font-size: 16px;
  padding: 0.5rem;
  width: 100%;
  cursor: pointer;

  &.btn-delete {
    border-color: ${(props) => props.theme.color.red[400]};
    &:hover {
      background: ${(props) => props.theme.color.red[400]};
    }
  }

  &:disabled {
    cursor: default;
  }

  &:hover {
    background: ${(props) => props.theme.mode.color[100]};
    color: ${(props) => props.theme.mode.background[200]};
    svg path {
      fill: ${(props) => props.theme.mode.background[200]};
    }
  }
`;

export default Button;
