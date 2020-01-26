import React from 'react';
import styled from 'styled-components';

import { ModalWrapper } from './styles';

import { FormWrapper } from '../Forms/styles';
import { Button } from '../Buttons';

const DeleteModal: React.FC<{
  text: string;
  hide: () => void;
  handleDelete: () => void;
}> = ({ text, hide, handleDelete }) => {
  function onDelete() {
    handleDelete();
    hide();
  }

  return (
    <DeleteModalWrapper>
      <FormWrapper>
        <p>{text}</p>
        <Button onClick={hide}>Cancel</Button>
        <Button onClick={onDelete}>Delete</Button>
      </FormWrapper>
    </DeleteModalWrapper>
  );
};

const DeleteModalWrapper = styled(ModalWrapper)`
  /* height: 360px;
  width: 360px; */
  p {
    font-size: ${(p) => p.theme.font[3]};
    padding-bottom: ${(p) => p.theme.space[2]};
  }
`;

export default DeleteModal;
