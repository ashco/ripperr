import React, { useContext } from 'react';
import styled from 'styled-components';

const DeleteModal = ({ text, handleDelete, hide }: any) => {
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
