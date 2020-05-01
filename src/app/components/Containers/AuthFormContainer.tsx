import React from 'react';
import styled, { ThemeContext } from 'styled-components';

import ColorBarContainer from './ColorBarContainer';

const AuthFormContainer: React.FC = ({ children }) => {
  const theme = React.useContext(ThemeContext);

  return (
    <ColorBarContainer color="green">
      <AuthFormContainerWrapper>{children}</AuthFormContainerWrapper>
    </ColorBarContainer>
  );
};

const AuthFormContainerWrapper = styled.div`
  max-width: 32rem;
  box-shadow: ${(props) => props.theme.shadow[1]};
  padding: 24px;
  /* border-radius: 5px; */
  /* margin: 2rem auto; */
  /* background-color: ${(props) => props.theme.color.blue[100]}; */
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
      /* margin-bottom: 0.25rem; */
    }
    /* a:last-child {
      margin-bottom: auto;
    } */
  }
`;

export default AuthFormContainer;
