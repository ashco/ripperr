import React from 'react';
import { useSelector, useDispatch } from 'store';
import MovementForm from 'domain/MovementForm';

import { useMoveState } from 'context/MoveContext';
import ModalBackground from 'components/ModalBackground';
import ModalContainer from 'components/ModalContainer';

import singleCapString from 'utils/single-cap-string';

import { Movement } from 'types/types';
import { MovementType } from 'types/enums';
import ColorBarWrapper from 'components/ColorBarWrapper';

const MovementContainer: React.FC<{}> = () => {
  const moveState = useMoveState();
  const { modalMode } = useSelector((state) => state.modal);

  let headerText;
  switch (modalMode) {
    case 'MODAL_VIEW':
      headerText = moveState?.name;
      break;
    case 'MODAL_EDIT':
      headerText = `${singleCapString(modalMode)} ${singleCapString(
        (moveState as Movement).type,
      )}`;
      break;
    default:
      break;
  }

  let color;
  let width;
  switch ((moveState as Movement).type) {
    case MovementType.Archetype:
      color = 'orange';
      width = '32rem';
      break;
    case MovementType.Exercise:
      color = 'purple';
      width = '36rem';
      break;
    case MovementType.Workout:
      color = 'blue';
      width = '48rem';
      break;
    default:
  }

  return (
    <ModalBackground>
      <ColorBarWrapper color={color}>
        <ModalContainer width={width}>
          <h1 className="header">{headerText}</h1>
          <MovementForm />
        </ModalContainer>
      </ColorBarWrapper>
    </ModalBackground>
  );
};

export default MovementContainer;
