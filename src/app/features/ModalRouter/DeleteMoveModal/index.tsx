import React from 'react';
import { useDispatch, batch } from 'store';
import { setModalMode } from 'store/ui';
import { clearActiveMove } from 'store/moves';

import ModalBackground from 'components/ModalBackground';

import DeleteMoveModalContainer from './style';

import AuthUserContext from 'context/AuthUserContext';
import FirebaseContext from 'context/FirebaseContext';
import ButtonRow from 'components/ButtonRow';

import assertNever from 'utils/assert-never';

import { Move } from 'types';

const DeleteMoveModal: React.FC<{ move: Move }> = ({ move }) => {
  const dispatch = useDispatch();

  const authUser = React.useContext(AuthUserContext);
  const firebase = React.useContext(FirebaseContext);

  const { data, type } = move;
  if (!data) throw new Error('No data!');

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

    if (authUser && data) {
      firebaseFnc(authUser.uid, data.id)
        .delete()
        .then(() => console.log(`${type} Deleted: ${data.name}`))
        .catch((err) => console.error(err));
    } else {
      throw Error('No authUser!');
    }
  }

  function onDelete(): void {
    handleDelete();
    batch(() => {
      dispatch(setModalMode({ modalMode: null }));
      // dispatch(clearActiveMove());
    });
  }

  const btnConfig = {
    cancelBtn: {
      text: 'Cancel',
      onClick: (): void => {
        batch(() => {
          dispatch(setModalMode({ modalMode: null }));
          // dispatch(clearActiveMove());
        });
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
