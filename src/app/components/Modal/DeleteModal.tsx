import React, { useContext } from 'react';
import styled from 'styled-components';

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

const DeleteModalWrapper = styled.div`
  background: white;
  height: 360px;
  width: 360px;
`;

export default DeleteModal;
