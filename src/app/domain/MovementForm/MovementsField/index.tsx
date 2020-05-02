import React from 'react';
import styled from 'styled-components';

import { ExerciseFormListItem } from '../../ListItems';

import { IMovementRefs } from '../../../types/types';
import { WorkoutMode, ModalMode } from '../../../types/enums';

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
          <MovementField key={move.id}>
            <ExerciseFormListItem
              exercise={move}
              mode={mode}
              modalMode={modalMode}
              index={i}
              disabled={disabled}
            />
          </MovementField>
        );
      })}
    </MovementsFieldWrapper>
  );
};

const MovementsFieldWrapper = styled.div``;

const MovementField = styled.div`
  input {
    justify-self: end;
  }
`;

export default MovementsField;
