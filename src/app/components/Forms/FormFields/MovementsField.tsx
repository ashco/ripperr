import React from 'react';
import styled from 'styled-components';

import { ExerciseListItemForm } from '../../ListItems';
import { Button } from '../../Buttons';

import { IMovementRefs } from '../../../common/types';
import { WorkoutMode } from '../../../common/enums';

const MovementsField: React.FC<{
  movements: IMovementRefs[];
  mode: WorkoutMode;
  disabled: boolean;
}> = ({ movements, disabled, mode }) => {
  return (
    <MovementsFieldWrapper>
      {movements.map((move, i) => {
        return (
          <MovementField key={move.id}>
            <ExerciseListItemForm
              exercise={move}
              mode={mode}
              index={i}
              disabled={disabled}
            />
          </MovementField>
        );
      })}
    </MovementsFieldWrapper>
  );
};

const MovementsFieldWrapper = styled.div`
  /* border: red 1px solid; */
`;

const MovementField = styled.div`
  /* display: grid; */
  /* grid-template-columns: 3fr 1fr 1fr; */
  input {
    justify-self: end;
  }
`;

export default MovementsField;
