import React, { useState } from 'react';
import styled from 'styled-components';

import sizes from '../../styles/sizes';

import { Modal } from '../Modal';

import { MovementModal } from '../Forms';
import { Button } from '../Buttons';

import { IMovements } from '../../common/types';
import { FormMode } from '../../common/enums';

import PlusIcon from '../../static/icons/plus-solid.svg';

const MovementModalButton: React.FC<{
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
  bottom: 1.5rem;
  right: 1.5rem;
  width: 3rem;
  height: 3rem;
  /*
  width: 90vw;
  */
  img {
    width: 1.5rem;
  }
  @media (min-width: ${sizes.tablet}px) {
    /* left: inherit;
    width: ${(p) => p.theme.space[8]};
    margin: 0; */
  }
`;

export default MovementModalButton;
