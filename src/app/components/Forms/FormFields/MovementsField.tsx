import React from 'react';
import styled from 'styled-components';

import { ExerciseListItemForm } from '../../ListItems';

import { IMovementRefs } from '../../../common/types';

const MovementsField: React.FC<{
  movements: IMovementRefs[];
}> = ({ movements }) => {
  return (
    <MovementsFieldWrapper>
      {movements.map((move, i) => {
        return (
          <MovementField key={move.id}>
            <ExerciseListItemForm exercise={move} index={i} />
          </MovementField>
        );
      })}
      <AddMovementFieldButton />
    </MovementsFieldWrapper>
  );
};

const AddMovementFieldButton: React.FC = () => {
  return <button>Add Movement</button>;
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
