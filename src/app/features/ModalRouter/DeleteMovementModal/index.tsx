import React from 'react';
import { useSelector, useDispatch } from 'store';
import { setModalMode } from 'store/ui';
import { MovesState } from 'store/moves';

import ModalBackground from 'components/ModalBackground';

import DeleteMovementContainer from './style';

import AuthUserContext from 'context/AuthUserContext';
import FirebaseContext from 'context/FirebaseContext';
import ButtonRow from 'components/ButtonRow';

// import { MovementType } from 'types/enums';
import ColorBarWrapper from 'components/ColorBarWrapper';
import { lookupMove } from 'utils/lookup-move';
import singleCapString from 'utils/single-cap-string';

const DeleteMovementModal: React.FC<{ moves: MovesState }> = ({ moves }) => {
  const dispatch = useDispatch();
  const authUser = React.useContext(AuthUserContext);
  const firebase = React.useContext(FirebaseContext);

  const move = lookupMove(moves);
  if (!move) throw Error('id did not find move!');
  const { data, type } = move;

  function handleDelete(): void {
    let firebaseFnc;
    if (type === 'TAG') {
      firebaseFnc = firebase.archetype;
    } else if (type === 'EXERCISE') {
      firebaseFnc = firebase.exercise;
    } else if (type === 'WORKOUT') {
      firebaseFnc = firebase.workout;
    } else {
      throw Error('type is not recognized!');
    }

    if (authUser && moves.activeId) {
      firebaseFnc(authUser.uid, moves.activeId)
        .delete()
        .then(() => console.log(`${type} Deleted: ${data.name}`))
        .catch((err) => console.error(err));
    } else {
      throw Error('No authUser && moveState.id!');
    }
  }

  function onDelete(): void {
    handleDelete();
    dispatch(setModalMode({ modalMode: 'CLOSED' }));
  }

  const btnConfig = {
    cancelBtn: {
      text: 'Cancel',
      onClick: () => dispatch(setModalMode({ modalMode: 'CLOSED' })),
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
          <h1 className="header">{data.name}</h1>
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
