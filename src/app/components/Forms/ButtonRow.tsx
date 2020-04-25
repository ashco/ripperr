import React from 'react';
import styled from 'styled-components';

import { Button } from '../Buttons';

import { ButtonRowProps } from '../../types/types';

const ButtonRow: React.FC<{ config: ButtonRowProps }> = ({ config }) => {
  const { cancelBtn, actionBtn } = config;

  return (
    <ButtonRowWrapper>
      <Button type="button" onClick={cancelBtn.onClick}>
        {cancelBtn.text}
      </Button>
      <Button
        type="submit"
        onClick={actionBtn.onClick}
        className={actionBtn.className}
      >
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
