import React, { useState, RefObject } from 'react';
import styled from 'styled-components';

import sizes from '../../styles/sizes';

import { Modal } from '../Modal';

import { MovementModal } from '../Forms';
import { Button } from '.';

import { IMovements } from '../../common/types';
import { FormMode } from '../../common/enums';

import PlusIcon from '../../static/icons/plus-solid.svg';

const MovementFormButton: React.FC<{
  formMode: FormMode;
  movement?: IMovements;
}> = ({ formMode, movement }) => {
  const [showModal, setShowModal] = useState(false);
  const hide = (): void => setShowModal(false);
  const show = (): void => setShowModal(true);

  let ButtonEl;
  if (formMode === FormMode.Add) {
    ButtonEl = (
      <AddMovementButton onClick={show}>
        <img src={PlusIcon} alt="Add Movement" />
      </AddMovementButton>
    );
  } else if (formMode === FormMode.Edit) {
    ButtonEl = <Button onClick={show}>Edit</Button>;
  } else if (formMode === FormMode.View) {
    ButtonEl = <Button onClick={show}>View</Button>;
  }

  const modal = showModal ? (
    <Modal>
      <MovementModal formMode={formMode} hide={hide} movement={movement} />
    </Modal>
  ) : null;

  return (
    <>
      {ButtonEl}
      {modal}
    </>
  );
};

const AddMovementButton = styled(Button)`
  img {
    width: 1.5rem;
  }
`;

export default MovementFormButton;
