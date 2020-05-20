import styled from 'styled-components';

const FormError = styled.span`
  margin: auto 0.25rem;
  font-size: 0.75rem;
  color: ${(p) => p.theme.mode.color[100]};
  text-align: center;
`;

export default FormError;
