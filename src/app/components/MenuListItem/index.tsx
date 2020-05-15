import React from 'react';
import { useSelector, useDispatch } from 'store';
import { setModalMode, setIsAddMoveMode } from 'store/ui';
import { useMoveDispatch } from 'context/MoveContext';

import ColorBarWrapper from 'components/ColorBarWrapper';
import OptionMenuButton from 'components/MenuListItem/OptionMenuButton';

import { WorkoutWrapper, ExerciseWrapper, ArchetypeWrapper } from './style';

import { Movement } from 'types/types';
import { MovementType } from 'types/enums';

const MenuListItem: React.FC<{ movement: Movement }> = ({ movement }) => {
  const filter = useSelector((state) => state.filter);
  const { isAddMoveMode } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  // const modalDispatch = useModalDispatch();
  const moveDispatch = useMoveDispatch();

  const btnRef = React.useRef<HTMLDivElement>(null);

  // Determine ColorBar color
  let color;
  switch (movement.type) {
    case MovementType.Archetype: {
      // TODO
      // Make more efficient by lifting up. Do not loop through array for each component.
      const active = filter.tags.includes(movement.id as string);
      color = active ? 'orange' : 'neutral';
      break;
    }
    case MovementType.Exercise:
      color = 'purple';
      break;
    case MovementType.Workout:
      color = 'blue';
      break;
    default:
      break;
  }

  function toggleActiveArch(e: any) {
    if (!btnRef?.current?.contains(e.target)) {
      dispatch({ type: 'FILTER_TOGGLE_TAG', payload: movement.id });
    }
  }

  function showModalView(e: any): void {
    if (!btnRef?.current?.contains(e.target)) {
      dispatch(setModalMode('VIEW'));
      moveDispatch({ type: 'MOVE_SET', value: movement });
    }
  }

  function addMoveToWorkout(e: any): void {
    if (!btnRef?.current?.contains(e.target)) {
      console.log('Adding movement to workout');
      moveDispatch({ type: 'MOVE_ADD_MOVE', value: movement });
      dispatch(setModalMode('EDIT'));
      dispatch(setIsAddMoveMode(false));
    }
  }

  function handleClick(e: any) {
    if (movement.type === MovementType.Archetype) {
      toggleActiveArch(e);
    } else {
      if (isAddMoveMode) {
        addMoveToWorkout(e);
      } else {
        showModalView(e);
      }
    }
  }

  function stringShortener(str: string, length: number): string {
    let shortStr = str.substring(0, length).trimEnd();

    if (str !== shortStr) {
      shortStr += '..';
    }
    return shortStr;
  }

  const nameLength = movement.type === MovementType.Archetype ? 10 : Infinity;

  const listItem = (
    <ColorBarWrapper color={color} height="5px">
      <div className="menu-list-item-container" onClick={handleClick}>
        <div className="left">
          <p className="name">{stringShortener(movement.name, nameLength)}</p>
        </div>
        <div className="right">
          {!isAddMoveMode && (
            <div ref={btnRef} className="option-menu-btn-wrapper">
              <OptionMenuButton movement={movement} />
            </div>
          )}
        </div>
      </div>
    </ColorBarWrapper>
  );

  if (movement.type === MovementType.Workout) {
    return <WorkoutWrapper>{listItem}</WorkoutWrapper>;
  } else if (movement.type === MovementType.Exercise) {
    return <ExerciseWrapper>{listItem}</ExerciseWrapper>;
  } else if (movement.type === MovementType.Archetype) {
    return <ArchetypeWrapper>{listItem}</ArchetypeWrapper>;
  } else {
    return null;
  }
};

export default MenuListItem;
