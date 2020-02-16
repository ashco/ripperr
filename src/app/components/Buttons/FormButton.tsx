import React from 'react';
import styled from 'styled-components';

import Button from './Button';

const FormButton = styled(Button)`
  &:hover {
    background-color: ${(props) => props.theme.color.neutral[300]};
  }
`;

export default FormButton;
