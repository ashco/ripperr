import React, { useState } from 'react';
import styled from 'styled-components';

import { Modal } from '../Modal';

import { MovementModal } from '../Forms';
import { Button } from '../Buttons';

import { IExercise, IWorkout } from '../../common/types';
import { FormMode } from '../../common/enums';

const MovementModalButton: React.FC<{
  formMode: FormMode;
  movement?: IExercise | IWorkout;
}> = ({ formMode, movement }) => {
  const [showModal, setShowModal] = useState(false);
  const hide = (): void => setShowModal(false);
  const show = (): void => setShowModal(true);

  let ButtonEl;
  if (formMode === FormMode.Add) {
    ButtonEl = <AddMovementButton onClick={show}>Add</AddMovementButton>;
  } else if (formMode === FormMode.Edit) {
    ButtonEl = <Button onClick={show}>Edit</Button>;
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
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: ${(p) => p.theme.space[8]};
`;

export default MovementModalButton;
