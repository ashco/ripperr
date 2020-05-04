import React from 'react';
import styled from 'styled-components';
import { arrayMove, SortableContainer } from 'react-sortable-hoc';

import MovementListItem from './MovementListItem';

import { IMovementRefs } from '@/types/types';
import { WorkoutMode, ModalMode } from '@/types/enums';

const MovementsList = SortableContainer(
  ({
    movements,
    disabled,
    mode,
    modalMode,
  }: {
    movements: IMovementRefs[];
    mode: WorkoutMode;
    modalMode: ModalMode;
    disabled: boolean;
  }) => {
    return (
      <MovementsFieldWrapper>
        {movements.map((move, i) => {
          return (
            <MovementListItem
              key={`item-${i}`}
              movement={move}
              mode={mode}
              modalMode={modalMode}
              index={i}
              disabled={disabled}
            />
          );
        })}
      </MovementsFieldWrapper>
    );
  },
);
const MovementsSortableComponent: React.FC<{
  movements: IMovementRefs[];
  mode: WorkoutMode;
  modalMode: ModalMode;
  disabled: boolean;
}> = ({ movements, disabled, mode, modalMode }) => {
  const [movementArr, setMovementArr] = React.useState(movements);

  function onSortEnd({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }): void {
    setMovementArr(arrayMove(movementArr, oldIndex, newIndex));
  }

  return (
    <MovementsList
      movements={movementArr}
      disabled={disabled}
      mode={mode}
      modalMode={modalMode}
      useDragHandle
      onSortEnd={onSortEnd}
      lockAxis="y"
      helperClass="sortableHelper"
    />
  );
};

const MovementsFieldWrapper = styled.ul`
  display: grid;
  gap: 0.5rem;
`;

export default MovementsSortableComponent;
