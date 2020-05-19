import styled from 'styled-components';

const AuthFormContainerWrapper = styled.div`
  display: grid;
  gap: 1rem;
  max-width: 32rem;
  box-shadow: ${(props) => props.theme.shadow[1]};
  padding: 24px;
  background: ${(props) => props.theme.mode.background[300]};
  h1 {
    font-size: 24px;
    color: ${(p) => p.theme.mode.color[100]};
    text-align: center;
  }
  .links {
    display: grid;
    text-align: center;
    gap: 0.5rem;
    a {
      color: ${(props) => props.theme.mode.color[100]};
      font-weight: 600;
    }
    a:hover {
      text-decoration-line: underline;
    }
  }
`;

export default AuthFormContainerWrapper;
