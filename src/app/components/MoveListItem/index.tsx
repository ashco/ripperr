import React from 'react';
import { useSelector, useDispatch, batch } from 'store';
import { setModalMode, setIsAddMoveMode } from 'store/ui';
import { setActiveMove, MovesState } from 'store/moves';
import { toggleFilterTag, FilterState } from 'store/filter';

import OptionMenuButton from 'components/MoveListItem/OptionMenuButton';

import MoveListItemContainer from './style';
import { lookupMove } from 'utils/lookup-move';

const MoveListItem: React.FC<{
  filter?: FilterState;
  id: string;
  isAddMoveMode: boolean;
  moves: MovesState;
}> = ({ filter, id, isAddMoveMode, moves }) => {
  const dispatch = useDispatch();

  const move = lookupMove(moves, id);
  if (!move) throw Error('lookup move by id failed!');
  const { data, type } = move;

  const btnRef = React.useRef<HTMLDivElement>(null);

  // Determine ColorBar color
  function getColor(): string {
    let color = '';
    switch (type) {
      case 'TAG': {
        // Make more efficient by lifting up. Do not loop through array for each component.
        const active = filter?.tags.includes(data.id as string);
        color = active ? 'orange' : 'neutral';
        break;
      }
      case 'EXERCISE':
        color = 'purple';
        break;
      case 'WORKOUT':
        color = 'blue';
        break;
      default:
        break;
    }
    return color;
  }

  function showModalView(e: any): void {
    if (!btnRef?.current?.contains(e.target)) {
      batch(() => {
        dispatch(setModalMode({ modalMode: 'VIEW' }));
        dispatch(setActiveMove(id));
      });
      // moveDispatch({ type: 'MOVE_SET', value: move });
    }
  }

  function addMoveToWorkout(e: any): void {
    if (!btnRef?.current?.contains(e.target)) {
      batch(() => {
        console.log('Adding movement to workout');
        // moveDispatch({ type: 'MOVE_ADD_MOVE', value: move });
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
    console.log(e);

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
  const color = getColor();

  return (
    <MoveListItemContainer
      color={color}
      barHeight="5px"
      onClick={handleClick}
      type={type}
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
