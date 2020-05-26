import React from 'react';
import { useSelector, useDispatch } from 'store';

import { clearActiveMove } from 'store/moves';

import AddMoveModal from 'features/ModalRouter/AddMoveModal';
import DeleteMoveModal from 'features/ModalRouter/DeleteMoveModal';
import MoveModal from 'features/ModalRouter/MoveModal';

import Modal from 'components/Modal';

import assertNever from 'utils/assert-never';
import useLookupMove from 'hooks/useLookupMove';

import { MovementType } from 'types';

const ModalRouter = () => {
  const { modalMode, isAddMoveMode } = useSelector((state) => state.ui);
  const { activeId } = useSelector((state) => state.moves);

  const dispatch = useDispatch();

  const [addMoveType, setAddMoveType] = React.useState<MovementType | null>(
    null,
  );

  React.useEffect(() => {
    if (modalMode === null && !isAddMoveMode) {
      setAddMoveType(null);
      dispatch(clearActiveMove());
    }
  }, [modalMode]);

  const move = useLookupMove(activeId);
  let content = null;

  if (move) {
    if (modalMode === 'DELETE') {
      content = <DeleteMoveModal move={move} />;
    } else if (modalMode === 'VIEW' || modalMode === 'EDIT') {
      content = <MoveModal modalMode={modalMode} move={move} />;
    }
  } else {
    if (!addMoveType) {
      content = <AddMoveModal setAddMoveType={setAddMoveType} />;
    } else {
      // new
      content = (
        <MoveModal modalMode="EDIT" move={{ data: null, type: addMoveType }} />
      );
    }
  }

  return <Modal isOpen={modalMode !== null}>{content}</Modal>;
};

export default ModalRouter;
