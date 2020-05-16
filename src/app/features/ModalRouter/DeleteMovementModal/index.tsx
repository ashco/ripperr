import React from 'react';
import { useSelector, useDispatch } from 'store';
import { setModalMode } from 'store/ui';
// import { useModalDispatch } from 'context/ModalContext';
import { useMoveState } from 'context/MoveContext';

import ModalBackground from 'components/ModalBackground';

import DeleteMovementContainer from './style';

import AuthUserContext from 'context/AuthUserContext';
import FirebaseContext from 'context/FirebaseContext';
import ButtonRow from 'components/ButtonRow';

import { MovementType } from 'types/enums';
import ColorBarWrapper from 'components/ColorBarWrapper';
import lookupMove from 'hooks/useMove';
import singleCapString from 'utils/single-cap-string';

const DeleteMovementModal = () => {
  // const dispatch = useModalDispatch();
  const dispatch = useDispatch();
  // const moveState = useMoveState();

  const { activeId } = useSelector((state) => state.moves);
  if (activeId === null) throw Error('activeId is not set!');

  const { move, type } = lookupMove(activeId);

  const authUser = React.useContext(AuthUserContext);
  const firebase = React.useContext(FirebaseContext);

  function handleDelete(): void {
    let firebaseFnc;
    if (type === 'tag') {
      firebaseFnc = firebase.archetype;
    } else if (type === 'exercise') {
      firebaseFnc = firebase.exercise;
    } else if (type === 'workout') {
      firebaseFnc = firebase.workout;
    } else {
      throw Error('activeId type is not recognized!');
    }

    if (authUser && activeId) {
      firebaseFnc(authUser.uid, activeId)
        .delete()
        .then(() => console.log(`${type} Deleted: ${move.name}`))
        .catch((err) => console.error(err));
    } else {
      throw Error('No authUser && moveState.id!');
    }
  }

  function onDelete(): void {
    handleDelete();
    dispatch(setModalMode(null));
  }

  const btnConfig = {
    cancelBtn: {
      text: 'Cancel',
      onClick: () => dispatch(setModalMode(null)),
    },
    actionBtn: {
      text: 'Delete',
      onClick: onDelete,
      className: 'btn-delete',
    },
  };

  return (
    <ModalBackground>
      <ColorBarWrapper color="red">
        <DeleteMovementContainer width="32rem">
          <h1 className="header">{move.name}</h1>
          <div className="content">
            <p>Do you want to delete this {type}?</p>
            <ButtonRow config={btnConfig} />
          </div>
        </DeleteMovementContainer>
      </ColorBarWrapper>
    </ModalBackground>
  );
};

export default DeleteMovementModal;
