import React from 'react';

import ModalBackground from 'components/ModalBackground';
import MoveForm from 'features/MoveForm';

import singleCapString from 'utils/single-cap-string';
import getColor from 'utils/get-color';
import assertNever from 'utils/assert-never';

import { MovementType, MovesState, ModalMode, Move } from 'types';

import MoveModalContainer from './style';

interface Style {
  color: string;
  headerText: string;
  width: string;
}

interface Props {
  modalMode: 'VIEW' | 'EDIT';
  move: Move;
}

const MoveModal: React.FC<Props> = ({ modalMode, move }) => {
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

  function getHeaderText(move: Move): string {
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

  React.useLayoutEffect(() => {
    const color = getColor(move.type);
    const width = getWidth(move.type);
    const headerText = getHeaderText(move);

    setStyle({
      color,
      width,
      headerText,
    });
  }, [move]);

  return (
    <ModalBackground>
      <MoveModalContainer color={style.color} width={style.width}>
        <h1>{style.headerText}</h1>
        <MoveForm modalMode={modalMode} move={move} />
      </MoveModalContainer>
    </ModalBackground>
  );
};

export default MoveModal;
