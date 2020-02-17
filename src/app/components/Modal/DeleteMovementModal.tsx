import React from 'react';
import styled from 'styled-components';

import { ModalWrapper } from './styles';

// import { FormWrapper } from '../Forms/styles';
import ButtonRow from '../Forms/ButtonRow';
// import { Button } from '../Buttons';

const DeleteModal: React.FC<{
  // hide: () => void;
  // handleDelete: () => void;
}> = () => {
  // function onDelete() {
  //   handleDelete();
  //   hide();
  // }

  // const cancelBtn = {
  //   onClick: hide,
  //   text: 'Cancel',
  // };
  // const actionBtn = {
  //   onClick: onDelete,
  //   text: 'Delete',
  // };

  return (
    <DeleteModalWrapper>
      <p>Do you want to delete this MOVEMENT?</p>
      {/* <ButtonRow cancelBtn={cancelBtn} actionBtn={actionBtn} /> */}
    </DeleteModalWrapper>
  );
};

const DeleteModalWrapper = styled(ModalWrapper)`
  display: grid;
  gap: 1rem;
  p {
    font-size: ${(p) => p.theme.font[3]};
  }
`;

export default DeleteModal;
