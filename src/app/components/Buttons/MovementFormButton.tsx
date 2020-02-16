import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import { Modal } from '../Modal';
import { MovementModal } from '../Forms';

import { Button, FormButton } from '.';

import { IMovements } from '../../common/types';
import { FormMode } from '../../common/enums';

import Plus from '../../icons/Plus';

const MovementFormButton: React.FC<{
  formMode: FormMode;
  movement?: IMovements;
}> = ({ formMode, movement }) => {
  const [showModal, setShowModal] = useState(false);
  const hide = (): void => setShowModal(false);
  const show = (): void => setShowModal(true);

  const [btnHovered, setBtnHovered] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  function toggleHover() {
    setBtnHovered((hovered) => !hovered);
  }

  let ButtonEl;
  if (formMode === FormMode.Add) {
    ButtonEl = (
      <AddMovementButton
        onClick={show}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        ref={btnRef}
      >
        <Plus color={btnHovered ? 'black' : 'gray'} />
      </AddMovementButton>
    );
  } else if (formMode === FormMode.Edit) {
    ButtonEl = <FormButton onClick={show}>Edit</FormButton>;
  } else if (formMode === FormMode.View) {
    ButtonEl = <FormButton onClick={show}>View</FormButton>;
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
  display: grid;
  place-items: center;
  background-color: white;
  svg {
    width: 1.5rem;
  }
`;

export default MovementFormButton;
