import React from 'react';
import { useSelector, useDispatch } from 'store';
import MovementForm from 'domain/MovementForm';

// import StyledMovementContainer from './style';

// import { usemodal } from 'context/ModalContext';
import { useMoveState } from 'context/MoveContext';
import ModalBackground from 'components/ModalBackground';
import ModalContainer from 'components/ModalContainer';

import singleCapString from 'utils/single-cap-string';

import { Movement } from 'types/types';
import { ModalMode, MovementType } from 'types/enums';
import ColorBarWrapper from 'components/ColorBarWrapper';

const MovementContainer: React.FC<{}> = () => {
  const moveState = useMoveState();
  // const modal = usemodal();
  const { modal } = useSelector((state) => state);

  let headerText;
  switch (modal.mode) {
    case ModalMode.View:
      headerText = moveState?.name;
      break;
    case ModalMode.Edit:
      headerText = `${singleCapString(modal.mode)} ${singleCapString(
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
