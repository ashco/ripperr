import React from 'react';
import styled from 'styled-components';

import { Button } from '../Buttons';

const ButtonRow: React.FC<{ submitText: string; hide: () => void }> = ({
  submitText,
  hide,
}) => (
  <ButtonRowWrapper>
    <Button type="submit">{submitText}</Button>
    <Button onClick={hide}>Cancel</Button>
  </ButtonRowWrapper>
);

const ButtonRowWrapper = styled.div`
  display: grid;
`;

export default ButtonRow;
