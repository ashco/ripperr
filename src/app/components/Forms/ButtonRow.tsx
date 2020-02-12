import React from 'react';
import styled from 'styled-components';

import { Button } from '../Buttons';

import { IButtonRow } from '../../common/types';

// const ButtonRow: React.FC<{ submitText: string; hide: () => void }> = ({
//   submitText,
//   hide,
// }) => (
//   <ButtonRowWrapper>
//     <Button onClick={hide}>Cancel</Button>
//     <Button type="submit">{submitText}</Button>
//   </ButtonRowWrapper>

const ButtonRow: React.FC<IButtonRow> = ({ cancelBtn, actionBtn }) => (
  <ButtonRowWrapper>
    <Button onClick={cancelBtn.onClick}>{cancelBtn.text}</Button>
    <Button type="submit" onClick={actionBtn.onClick}>
      {actionBtn.text}
    </Button>
  </ButtonRowWrapper>
);

const ButtonRowWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export default ButtonRow;
