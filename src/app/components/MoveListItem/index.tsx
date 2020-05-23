import React from 'react';
import { useDispatch, batch } from 'store';
import { setModalMode, setIsAddMoveMode } from 'store/ui';
import { setActiveMove } from 'store/moves';
import { toggleFilterTag } from 'store/filter';

import OptionMenuButton from 'components/MoveListItem/OptionMenuButton';

import MoveListItemContainer from './style';
import lookupMove from 'utils/lookup-move';
import getColor from 'utils/get-color';

import { MovesState } from 'types';

const MoveListItem: React.FC<{
  isDisabled?: boolean;
  id: string;
  isAddMoveMode: boolean;
  moves: MovesState;
}> = ({ isDisabled, id, isAddMoveMode, moves }) => {
  const dispatch = useDispatch();

  const move = lookupMove(moves, id);
  if (!move) throw Error('lookup move by id failed!');
  const { data, type } = move;

  const btnRef = React.useRef<HTMLDivElement>(null);

  function showModalView(e: any): void {
    if (!btnRef?.current?.contains(e.target)) {
      batch(() => {
        dispatch(setModalMode({ modalMode: 'VIEW' }));
        dispatch(setActiveMove(id));
      });
    }
  }

  function addMoveToWorkout(e: any): void {
    if (!btnRef?.current?.contains(e.target)) {
      batch(() => {
        dispatch(setModalMode({ modalMode: 'VIEW' }));
        dispatch(setIsAddMoveMode(false));
      });
    }
  }

  function toggleActiveArch(e: any) {
    if (!btnRef?.current?.contains(e.target)) {
      dispatch(toggleFilterTag(data.id));
    }
  }

  function handleClick(e: any) {
    if (type === 'WORKOUT' || type === 'EXERCISE') {
      if (isAddMoveMode) {
        addMoveToWorkout(e);
      } else {
        showModalView(e);
      }
    } else if (type === 'TAG') {
      toggleActiveArch(e);
    }
  }

  function stringShortener(str: string, length: number): string {
    let shortStr = str.substring(0, length).trimEnd();

    if (str !== shortStr) {
      shortStr += '..';
    }
    return shortStr;
  }

  const nameLength = type === 'TAG' ? 10 : Infinity;
  // const nameLength = 16;
  const color = isDisabled ? 'default' : getColor(type);

  return (
    <MoveListItemContainer
      color={color}
      barHeight="5px"
      onClick={handleClick}
      type={type}
      labelAccess={isDisabled ? 'disabled' : ''}
    >
      <div className="left">
        <p className="name">{stringShortener(data.name, nameLength)}</p>
      </div>
      <div className="right">
        {!isAddMoveMode && (
          <div ref={btnRef} className="option-menu-btn-wrapper">
            <OptionMenuButton data={data} type={type} />
          </div>
        )}
      </div>
    </MoveListItemContainer>
  );
};

export default MoveListItem;
