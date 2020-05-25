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
  const { modalMode } = useSelector((state) => state.ui);
  const { activeId } = useSelector((state) => state.moves);

  const dispatch = useDispatch();

  const [addMoveType, setAddMoveType] = React.useState<MovementType | null>(
    null,
  );

  React.useEffect(() => {
    if (modalMode === null) {
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

  // switch (modalMode) {
  //   case 'ADD':
  //     content = <AddMoveModal setAddMoveType={setAddMoveType} />;
  //     break;
  //   case 'DELETE':
  //     content = move ? <DeleteMoveModal move={move} /> : null;
  //     break;
  //   case 'VIEW':
  //     content = move ? <MoveModal modalMode="VIEW" move={move} /> : null;
  //     break;
  //   case 'EDIT':
  //     {
  //       if (addMoveType) {
  //         // new
  //         content = (
  //           <MoveModal
  //             modalMode="EDIT"
  //             move={{ data: null, type: addMoveType }}
  //           />
  //         );
  //       } else {
  //         // edit
  //         content = <MoveModal modalMode="EDIT" move={move} />;
  //       }
  //     }

  //     break;
  //   case null:
  //     content = null;
  //     break;
  //   default:
  //     assertNever(modalMode);
  // }
  // switch (modalMode) {
  //   case 'ADD':
  //     content = <AddMoveModal setAddMoveType={setAddMoveType} />;
  //     break;
  //   case 'DELETE':
  //     content = moves.activeId ? <DeleteMoveModal id={moves.activeId} /> : null;
  //     break;
  //   case 'EDIT':
  //   case 'VIEW':
  //     content = (
  //       <MoveModal
  //         addMoveType={addMoveType}
  //         modalMode={modalMode}
  //         moves={moves}
  //       />
  //     );
  //     break;
  // }

  return <Modal isOpen={modalMode !== null}>{content}</Modal>;
};

export default ModalRouter;
