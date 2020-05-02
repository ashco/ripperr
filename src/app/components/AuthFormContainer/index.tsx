import React from 'react';

import AuthFormContainerWrapper from './style';

import ColorBarContainer from '@/components/ColorBarContainer';

const AuthFormContainer: React.FC = ({ children }) => {
  return (
    <ColorBarContainer color="green">
      <AuthFormContainerWrapper>{children}</AuthFormContainerWrapper>
    </ColorBarContainer>
  );
};

export default AuthFormContainer;
