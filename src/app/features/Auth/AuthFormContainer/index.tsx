import React from 'react';

import AuthFormContainerWrapper from './style';

import ColorBarWrapper from 'components/ColorBarWrapper';

const AuthFormContainer: React.FC<{ title: string }> = ({
  title,
  children,
}) => {
  return (
    <ColorBarWrapper color="green">
      <AuthFormContainerWrapper>
        <h1>{title}</h1>
        {children}
      </AuthFormContainerWrapper>
    </ColorBarWrapper>
  );
};

export default AuthFormContainer;
