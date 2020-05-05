import React from 'react';

import AuthFormContainerWrapper from './style';

import ColorBarWrapper from 'components/ColorBarWrapper';

const AuthFormContainer: React.FC = ({ children }) => {
  return (
    <ColorBarWrapper color="green">
      <AuthFormContainerWrapper>{children}</AuthFormContainerWrapper>
    </ColorBarWrapper>
  );
};

export default AuthFormContainer;
