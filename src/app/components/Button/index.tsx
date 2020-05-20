import styled from 'styled-components';

const Button = styled.button<{ primary?: boolean }>`
  border: 2px solid ${(p) => p.theme.mode.color[100]};
  color: ${(p) =>
    p.primary ? p.theme.mode.background[100] : p.theme.mode.color[100]};
  background: ${(p) => (p.primary ? p.theme.mode.color[100] : 'none')};
  font-size: 16px;
  padding: 0.5rem;
  width: 100%;
  cursor: pointer;

  &.btn-delete {
    border-color: ${(p) => p.theme.color.red[400]};
    &:hover {
      background: ${(p) => p.theme.color.red[400]};
    }
  }

  &:disabled {
    cursor: default;
  }

  &:hover {
    background: ${(p) => (p.primary ? 'none' : p.theme.mode.color[100])};
    color: ${(p) =>
      p.primary ? p.theme.mode.color[100] : p.theme.mode.background[200]};
    /* border: ${(p) =>
      p.primary ? '2px solid ' + p.theme.mode.color[100] : 'none'}; */
    svg path {
      fill: ${(p) =>
        p.primary ? p.theme.mode.color[100] : p.theme.mode.background[200]};
    }
  }
`;

export default Button;
