import React from 'react';
import { useDispatch, batch } from 'store';
import { setModalMode } from 'store/ui';
import { clearActiveMove } from 'store/moves';

import ModalBackground from 'components/ModalBackground';

import DeleteMoveModalContainer from './style';

import AuthUserContext from 'context/AuthUserContext';
import FirebaseContext from 'context/FirebaseContext';
import ButtonRow from 'components/ButtonRow';

import lookupMove from 'utils/lookup-move';
import assertNever from 'utils/assert-never';

import { MovesState } from 'types';

const DeleteMoveModal: React.FC<{ moves: MovesState }> = ({ moves }) => {
  const dispatch = useDispatch();

  const authUser = React.useContext(AuthUserContext);
  const firebase = React.useContext(FirebaseContext);

  const move = lookupMove(moves);
  if (!move) throw Error('lookup move by id failed!');
  const { data, type } = move;

  function handleDelete(): void {
    let firebaseFnc;
    switch (type) {
      case 'WORKOUT':
        firebaseFnc = firebase.workout;
        break;
      case 'EXERCISE':
        firebaseFnc = firebase.exercise;
        break;
      case 'TAG':
        firebaseFnc = firebase.tag;
        break;
      default:
        assertNever(type);
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
    batch(() => {
      dispatch(setModalMode({ modalMode: 'CLOSED' }));
      dispatch(clearActiveMove());
    });
  }

  const btnConfig = {
    cancelBtn: {
      text: 'Cancel',
      onClick: (): void => {
        dispatch(setModalMode({ modalMode: 'CLOSED' }));
      },
    },
    actionBtn: {
      text: 'Delete',
      onClick: onDelete,
      className: 'btn-delete',
    },
  };

  return (
    <ModalBackground>
      <DeleteMoveModalContainer color="red">
        <h1>{data.name}</h1>
        <div className="content">
          <p>Do you want to delete this {type.toLowerCase()}?</p>
          <ButtonRow config={btnConfig} />
        </div>
      </DeleteMoveModalContainer>
    </ModalBackground>
  );
};

export default DeleteMoveModal;
