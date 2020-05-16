import styled from 'styled-components';

const AuthFormContainerWrapper = styled.div`
  max-width: 32rem;
  box-shadow: ${(props) => props.theme.shadow[1]};
  padding: 24px;
  background: ${(props) => props.theme.mode.background[300]};
  input,
  textarea {
    border: 2px solid ${(props) => props.theme.mode.color[100]};
    background: none;
    color: ${(props) => props.theme.mode.color[100]};
  }
  h1 {
    font-size: 24px;
    margin-bottom: 8px;
  }
  .links {
    display: grid;
    text-align: center;
    gap: 0.25rem;
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
