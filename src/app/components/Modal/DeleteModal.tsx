import React, { useContext } from 'react';
import styled from 'styled-components';
import { Modal } from '../Modal';

const DeleteModal = ({ text, handleDelete, hide }: any) => {
  return (
    <Modal>
      <DeleteModalWrapper>
        <h1>{text}</h1>
        <button onClick={hide}>Cancel</button>
        <button onClick={handleDelete}>Delete</button>
      </DeleteModalWrapper>
    </Modal>
  );
};

const DeleteModalWrapper = styled.div`
  background: white;
  height: 360px;
  width: 360px;
`;

export default DeleteModal;
