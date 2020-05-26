import React from 'react';
import { useDispatch, useSelector, batch } from 'store';
import { setModalMode, setIsAddMoveMode } from 'store/ui';
import { setActiveMove, setNewMoveListItem } from 'store/moves';
import { toggleFilterTag } from 'store/filter';

import OptionMenuButton from 'components/MoveListItem/OptionMenuButton';

import MoveListItemContainer from './style';
import useLookupMove from 'hooks/useLookupMove';
import getColor from 'utils/get-color';

const MoveListItem: React.FC<{
  isDisabled?: boolean;
  id: string;
  isAddMoveMode: boolean;
}> = ({ isDisabled, id, isAddMoveMode }) => {
  const dispatch = useDispatch();
  const btnRef = React.useRef<HTMLDivElement>(null);

  const move = useLookupMove(id);
  if (!move || !move.data) throw Error(`useLookupMove failed! ID: ${id}`);
  const { data, type } = move;

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
        // add new move to workout here
        dispatch(setNewMoveListItem(data.id));
        dispatch(setModalMode({ modalMode: 'EDIT' }));
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
