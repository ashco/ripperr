import React from 'react';

import { useModalDispatch } from '@/context/ModalContext';
import { useMoveDispatch } from '@/context/MoveContext';
import { useFilterState, useFilterDispatch } from '@/context/FilterContext';

import ColorBarWrapper from '@/components/ColorBarWrapper';
import OptionMenuButton from '@/components/MenuListItem/OptionMenuButton';

import { WorkoutWrapper, ExerciseWrapper, ArchetypeWrapper } from './style';

import { Movement } from '@/types/types';
import { MovementType } from '@/types/enums';

const MenuListItem: React.FC<{ movement: Movement }> = ({ movement }) => {
  const modalDispatch = useModalDispatch();
  const moveDispatch = useMoveDispatch();
  const filterState = useFilterState();
  const filterDispatch = useFilterDispatch();

  const btnRef = React.useRef<HTMLDivElement>(null);

  // Determine ColorBar color
  let color;
  switch (movement.type) {
    case MovementType.Archetype: {
      // TODO Make more efficient by lifting up. Do not loop through array for each component.
      const active = filterState.archs.includes(movement.id as string);
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

  function handleModalView(e: any): void {
    if (!btnRef?.current?.contains(e.target)) {
      modalDispatch({ type: 'MODAL_VIEW' });
      moveDispatch({ type: 'MOVE_SET', value: movement });
    }
  }

  function toggleActiveArch(e: any) {
    if (!btnRef?.current?.contains(e.target)) {
      filterDispatch({ type: 'FILTER_TOGGLE_ARCH', value: movement.id });
    }
  }

  function handleClick(e: any) {
    if (movement.type === MovementType.Archetype) {
      toggleActiveArch(e);
    } else {
      handleModalView(e);
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
      <div className="container" onClick={handleClick}>
        <div className="left">
          <p className="name">{stringShortener(movement.name, nameLength)}</p>
        </div>
        <div className="right">
          <div ref={btnRef} className="option-menu-btn-wrapper">
            <OptionMenuButton movement={movement} />
          </div>
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
