import React from 'react';
import { useSelector, useDispatch } from 'store';
import MoveForm from 'features/MoveForm';

import ModalBackground from 'components/ModalBackground';
import Container from 'components/Container';

import singleCapString from 'utils/single-cap-string';
import MoveModalContainer from './style';
import { MovementType } from 'types/types';
import ColorBarWrapper from 'components/ColorBarWrapper';
import { lookupMove, MoveDataType } from 'utils/lookup-move';
import { Movement, MovesState } from 'store/moves';
import { ModalMode } from 'store/ui';

const MoveModal: React.FC<{
  addMoveType: MovementType | null;
  modalMode: ModalMode;
  moves: MovesState;
}> = ({ addMoveType, modalMode, moves }) => {
  const [style, setStyle] = React.useState({
    color: '',
    width: '',
    headerText: '',
  });

  function getStyles(
    move: MoveDataType | { data: null; type: MovementType | null },
  ) {
    let color;
    let width;
    let headerText;

    const { data, type } = move;

    if (type === 'WORKOUT') {
      color = 'blue';
      width = '48rem';
    } else if (type === 'EXERCISE') {
      color = 'purple';
      width = '36rem';
    } else if (type === 'TAG') {
      color = 'orange';
      width = '32rem';
    } else {
      throw Error('moveData.type not found!');
    }

    if (modalMode === 'VIEW') {
      headerText = data?.name || '';
    } else if (modalMode === 'EDIT') {
      if (move.data) {
        headerText = `${singleCapString(modalMode)} ${singleCapString(type)}`;
      } else {
        headerText = `Create New ${singleCapString(type)}`;
      }
    } else {
      throw Error('modalMode does not match!');
    }

    return { color, width, headerText };
  }

  const move = lookupMove(moves) || { data: null, type: addMoveType };

  // const move = lookupMove('fBk6nw3ZtW7Vf5aXFw1D') || {
  //   data: null,
  //   type: addMoveType,
  // };

  React.useLayoutEffect(() => {
    const { color, width, headerText } = getStyles(move);

    setStyle({
      color,
      width,
      headerText,
    });
  }, [moves.activeId, addMoveType]);

  return move.type ? (
    <ModalBackground>
      <MoveModalContainer color={style.color} width={style.width}>
        <h1>{style.headerText}</h1>
        <MoveForm
          activeId={moves.activeId}
          modalMode={modalMode}
          move={
            move as
              | MoveDataType
              | { data: null; type: 'WORKOUT' | 'EXERCISE' | 'TAG' }
          }
        />
      </MoveModalContainer>
    </ModalBackground>
  ) : null;
};

export default MoveModal;
