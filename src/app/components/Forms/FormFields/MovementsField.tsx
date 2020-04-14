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
        console.log(move);
        return (
          <MovementField key={move.id}>
            {/* <div>Move Name</div> */}
            <ExerciseListItemForm exercise={move} />
            {/* <input
              type="text"
              placeholder={'Movement ' + (i + 1)}
              value={move.name}
            /> */}
            <input type="number" placeholder="Reps" min="0" max="999" />
            <input type="number" placeholder="Sets" min="0" max="999" />
            {/* <div>Reps</div>
            <div>Sets</div> */}
            {/* {move.name} */}
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
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  input {
    justify-self: end;
  }
`;

export default MovementsField;
