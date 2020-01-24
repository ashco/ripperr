import React from 'react';
import styled from 'styled-components';

import { ModalWrapper } from './styles';

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
      <h1>{text}</h1>
      <button onClick={hide}>Cancel</button>
      <button onClick={onDelete}>Delete</button>
    </DeleteModalWrapper>
  );
};

const DeleteModalWrapper = styled(ModalWrapper)`
  height: 360px;
  width: 360px;
`;

export default DeleteModal;
