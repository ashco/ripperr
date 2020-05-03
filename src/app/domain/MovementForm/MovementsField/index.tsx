import React from 'react';
import styled from 'styled-components';

import MovementListItem from './MovementListItem';

import { IMovementRefs } from '@/types/types';
import { WorkoutMode, ModalMode } from '@/types/enums';

const MovementsField: React.FC<{
  movements: IMovementRefs[];
  mode: WorkoutMode;
  modalMode: ModalMode;
  disabled: boolean;
}> = ({ movements, disabled, mode, modalMode }) => {
  return (
    <MovementsFieldWrapper>
      {movements.map((move, i) => {
        return (
          <MovementListItem
            key={move.id}
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
};

const MovementsFieldWrapper = styled.div`
  display: grid;
  gap: 0.5rem;
`;

// const MovementField = styled.div`
//   input {
//     justify-self: end;
//   }
// `;

export default MovementsField;
