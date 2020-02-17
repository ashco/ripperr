import React from 'react';
import styled from 'styled-components';

import { Button } from '../Buttons';

import { ButtonRowProps } from '../../common/types';

const ButtonRow: React.FC<{ config: ButtonRowProps }> = ({ config }) => {
  const { cancelBtn, actionBtn } = config;

  return (
    <ButtonRowWrapper>
      <Button onClick={cancelBtn.onClick}>{cancelBtn.text}</Button>
      <Button type="submit" onClick={actionBtn.onClick}>
        {actionBtn.text}
      </Button>
    </ButtonRowWrapper>
  );
};

const ButtonRowWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export default ButtonRow;
