import React from 'react';

import ModalBackground from 'components/ModalBackground';
import MoveForm from 'features/MoveForm';

import singleCapString from 'utils/single-cap-string';
import lookupMove, { MoveDataType } from 'utils/lookup-move';
import getColor from 'utils/get-color';
import assertNever from 'utils/assert-never';

import { MovementType, MovesState, ModalMode } from 'types';

import MoveModalContainer from './style';

interface Style {
  color: string;
  headerText: string;
  width: string;
}

const MoveModal: React.FC<{
  addMoveType: MovementType | null;
  modalMode: ModalMode;
  moves: MovesState;
}> = ({ addMoveType, modalMode, moves }) => {
  const [style, setStyle] = React.useState<Style>({
    color: '',
    headerText: '',
    width: '',
  });

  function getWidth(type: MovementType): string {
    switch (type) {
      case 'WORKOUT':
        return '40rem';
      case 'EXERCISE':
        return '36rem';
      case 'TAG':
        return '32rem';
      default:
        assertNever(type);
    }
  }

  function getHeaderText(move: MoveDataType): string {
    if (modalMode === 'VIEW') {
      return move.data?.name || '';
    } else if (modalMode === 'EDIT') {
      if (move.data) {
        return `${singleCapString(modalMode)} ${singleCapString(move.type)}`;
      } else {
        return `Create New ${singleCapString(move.type)}`;
      }
    } else {
      throw Error('modalMode does not match!');
    }
  }

  const move = lookupMove(moves) || { data: null, type: addMoveType };
  if (!move || !move.type) throw Error('lookup move by id failed!');

  React.useLayoutEffect(() => {
    if (!move || !move.data || !move.type) throw Error('whoops');

    const color = getColor(move.type);
    const width = getWidth(move.type);
    const headerText = getHeaderText(move);

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
          move={move as MoveDataType | { data: null; type: MovementType }}
        />
      </MoveModalContainer>
    </ModalBackground>
  ) : null;
};

export default MoveModal;
